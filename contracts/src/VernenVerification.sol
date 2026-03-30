// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title VernenVerification
 * @notice On-chain compliance verification registry for Vernen Legal Compliance
 *
 * This contract stores cryptographic proofs of compliance checks.
 * Each verification is a SHA-256 hash of: rules checked + results + timestamp.
 * Once anchored, the proof is immutable and publicly verifiable.
 *
 * The building inspector's stamp — on-chain, forever.
 *
 * @dev Deployed on Base L2 for low gas costs (~$0.01 per anchor).
 *      Only the authorized verifier (REGULIS) can anchor new verifications.
 *      Anyone can read and verify.
 */
contract VernenVerification {
    // ═══════════════════════════════════════════════════════════════════
    // TYPES
    // ═══════════════════════════════════════════════════════════════════

    enum Status {
        VERIFIED_COMPLIANT,      // All rules passed
        VERIFIED_PARTIAL,        // Some rules need attention
        VERIFIED_NON_COMPLIANT,  // Critical failures found
        VERIFIED_PENDING_REVIEW  // Manual review required
    }

    struct Verification {
        bytes32 hash;           // SHA-256 verification hash
        uint16 score;           // Compliance score in basis points (0-10000 = 0-100.00%)
        Status status;          // Verification outcome
        uint32 rulesChecked;    // Number of rules evaluated
        uint40 timestamp;       // When the check was performed (unix)
        uint40 expiresAt;       // When this verification expires (unix)
        bool exists;            // Sentinel for existence check
    }

    // ═══════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════

    /// @notice Contract owner — the Vernen platform
    address public owner;

    /// @notice Authorized verifier address (REGULIS worker wallet)
    address public verifier;

    /// @notice Total verifications anchored on-chain
    uint256 public totalVerifications;

    /// @notice Verification hash => on-chain record
    mapping(bytes32 => Verification) public verifications;

    /// @notice Ordered list of all verification hashes (for enumeration)
    bytes32[] public verificationHashes;

    // ═══════════════════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════════════════

    /// @notice Emitted when a new verification is anchored on-chain
    event VerificationAnchored(
        bytes32 indexed hash,
        uint16 score,
        Status status,
        uint32 rulesChecked,
        uint40 timestamp,
        uint40 expiresAt
    );

    /// @notice Emitted when the verifier address changes
    event VerifierUpdated(address indexed oldVerifier, address indexed newVerifier);

    /// @notice Emitted when ownership transfers
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

    // ═══════════════════════════════════════════════════════════════════
    // ERRORS
    // ═══════════════════════════════════════════════════════════════════

    error Unauthorized();
    error AlreadyAnchored();
    error InvalidHash();
    error InvalidScore();
    error InvalidTimestamp();

    // ═══════════════════════════════════════════════════════════════════
    // MODIFIERS
    // ═══════════════════════════════════════════════════════════════════

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier onlyVerifier() {
        if (msg.sender != verifier && msg.sender != owner) revert Unauthorized();
        _;
    }

    // ═══════════════════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════════

    /// @param _verifier Initial authorized verifier address
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }

    // ═══════════════════════════════════════════════════════════════════
    // WRITE — Only verifier can anchor
    // ═══════════════════════════════════════════════════════════════════

    /**
     * @notice Anchor a compliance verification on-chain
     * @param _hash SHA-256 verification hash from the compliance engine
     * @param _score Compliance score in basis points (0-10000)
     * @param _status Verification outcome
     * @param _rulesChecked Number of compliance rules evaluated
     * @param _timestamp Unix timestamp of when the check was performed
     * @param _expiresAt Unix timestamp of when this verification expires
     */
    function anchor(
        bytes32 _hash,
        uint16 _score,
        Status _status,
        uint32 _rulesChecked,
        uint40 _timestamp,
        uint40 _expiresAt
    ) external onlyVerifier {
        if (_hash == bytes32(0)) revert InvalidHash();
        if (_score > 10000) revert InvalidScore();
        if (_timestamp == 0) revert InvalidTimestamp();
        if (verifications[_hash].exists) revert AlreadyAnchored();

        verifications[_hash] = Verification({
            hash: _hash,
            score: _score,
            status: _status,
            rulesChecked: _rulesChecked,
            timestamp: _timestamp,
            expiresAt: _expiresAt,
            exists: true
        });

        verificationHashes.push(_hash);
        totalVerifications++;

        emit VerificationAnchored(
            _hash,
            _score,
            _status,
            _rulesChecked,
            _timestamp,
            _expiresAt
        );
    }

    /**
     * @notice Anchor multiple verifications in a single transaction (batch)
     * @dev Gas efficient for bulk anchoring
     */
    function anchorBatch(
        bytes32[] calldata _hashes,
        uint16[] calldata _scores,
        Status[] calldata _statuses,
        uint32[] calldata _rulesChecked,
        uint40[] calldata _timestamps,
        uint40[] calldata _expiresAts
    ) external onlyVerifier {
        uint256 len = _hashes.length;
        require(
            len == _scores.length &&
            len == _statuses.length &&
            len == _rulesChecked.length &&
            len == _timestamps.length &&
            len == _expiresAts.length,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < len; i++) {
            bytes32 h = _hashes[i];
            if (h == bytes32(0)) revert InvalidHash();
            if (_scores[i] > 10000) revert InvalidScore();
            if (_timestamps[i] == 0) revert InvalidTimestamp();
            if (verifications[h].exists) continue; // Skip duplicates in batch

            verifications[h] = Verification({
                hash: h,
                score: _scores[i],
                status: _statuses[i],
                rulesChecked: _rulesChecked[i],
                timestamp: _timestamps[i],
                expiresAt: _expiresAts[i],
                exists: true
            });

            verificationHashes.push(h);
            totalVerifications++;

            emit VerificationAnchored(
                h,
                _scores[i],
                _statuses[i],
                _rulesChecked[i],
                _timestamps[i],
                _expiresAts[i]
            );
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // READ — Anyone can verify
    // ═══════════════════════════════════════════════════════════════════

    /**
     * @notice Check if a verification hash exists on-chain
     * @param _hash The verification hash to check
     * @return exists Whether the hash has been anchored
     * @return valid Whether the verification is not expired
     * @return score The compliance score (basis points)
     * @return status The verification outcome
     * @return rulesChecked Number of rules evaluated
     * @return timestamp When the check was performed
     * @return expiresAt When the verification expires
     */
    function verify(bytes32 _hash)
        external
        view
        returns (
            bool exists,
            bool valid,
            uint16 score,
            Status status,
            uint32 rulesChecked,
            uint40 timestamp,
            uint40 expiresAt
        )
    {
        Verification storage v = verifications[_hash];
        exists = v.exists;
        if (!exists) return (false, false, 0, Status.VERIFIED_PENDING_REVIEW, 0, 0, 0);

        valid = v.expiresAt == 0 || v.expiresAt > uint40(block.timestamp);
        score = v.score;
        status = v.status;
        rulesChecked = v.rulesChecked;
        timestamp = v.timestamp;
        expiresAt = v.expiresAt;
    }

    /**
     * @notice Check if a hash is anchored (simple boolean check)
     * @param _hash The verification hash
     * @return Whether the hash exists on-chain
     */
    function isAnchored(bytes32 _hash) external view returns (bool) {
        return verifications[_hash].exists;
    }

    /**
     * @notice Get the total count of anchored verifications
     * @return The count
     */
    function getCount() external view returns (uint256) {
        return totalVerifications;
    }

    /**
     * @notice Get a verification hash by index (for enumeration)
     * @param _index The index in the ordered list
     * @return The verification hash at that index
     */
    function getHashByIndex(uint256 _index) external view returns (bytes32) {
        return verificationHashes[_index];
    }

    // ═══════════════════════════════════════════════════════════════════
    // ADMIN
    // ═══════════════════════════════════════════════════════════════════

    /**
     * @notice Update the authorized verifier address
     * @param _newVerifier The new verifier address
     */
    function setVerifier(address _newVerifier) external onlyOwner {
        address old = verifier;
        verifier = _newVerifier;
        emit VerifierUpdated(old, _newVerifier);
    }

    /**
     * @notice Transfer contract ownership
     * @param _newOwner The new owner address
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Zero address");
        address old = owner;
        owner = _newOwner;
        emit OwnershipTransferred(old, _newOwner);
    }
}
