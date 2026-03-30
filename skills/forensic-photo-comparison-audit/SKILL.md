---
name: forensic-photo-comparison-audit
description: Forensic facial/photo comparison analysis following FISWG, SWGIT, and OSAC/NIST methodology standards for identity determination and image integrity verification.
---

# Forensic Photo Comparison Audit Framework

## Purpose
Structured forensic photo comparison skill. When photographs are submitted for identity comparison, execute the full FISWG/SWGIT/OSAC methodology — from intake through chain-of-custody documentation, quality assessment, independent morphological analysis, feature comparison, standardized conclusion, and court-admissible report generation.

## Governing Standards

### Facial Identification Scientific Working Group (FISWG)
- Guidelines for Facial Comparison Methods
- Training Qualifications for Facial Comparison
- Reporting and Documentation Standards
- Quality Assurance for Facial Comparison
- Reference: fiswg.org

### Scientific Working Group on Imaging Technology (SWGIT)
- Best Practices for Image Authentication
- Best Practices for Maintaining the Integrity of Digital Images
- Best Practices for Image Analysis
- Proficiency Testing and Quality Assurance
- Reference: swgit.org

### Organization of Scientific Area Committees (OSAC) / NIST
- Facial Identification Standards (OSAC Subcommittee)
- Consensus Documentary Standards for Facial Comparison
- Measurement Science for Forensic Facial Identification
- Reference: nist.gov/osac

### International Association for Identification (IAI)
- Certified Forensic Examiner Credentialing
- Forensic Image Analyst Certification
- Professional Ethics Standards
- Reference: theiai.org

### Daubert/Frye Admissibility Framework
- Testable methodology (reproducible feature analysis)
- Peer-reviewed standards (FISWG/OSAC published guidelines)
- Known error rates (documented limitations and confidence)
- General acceptance (FBI, law enforcement, forensic labs worldwide)

## Audit Triggers

Activate when:
- Two or more photographs submitted for identity comparison
- Request to determine if photos depict the same individual
- Photo manipulation or alteration suspected
- Identity verification required for legal proceedings
- Facial comparison needed for evidentiary purposes
- Challenge to photographic identity in court filings
- Document containing photographs requires authenticity verification
- Surveillance or identification photo presented as evidence

## Audit Checklist

### Gate 1 — Image Intake & Chain of Custody (SWGIT)
- [ ] Log receipt of all images with source, date, format, and file metadata
- [ ] Preserve originals — work only on copies
- [ ] Record provenance — who provided, how obtained, prior handling
- [ ] Hash all files (SHA-256) at intake for integrity baseline
- [ ] Flag images arriving without metadata or with stripped EXIF data
- [ ] Assign case identifier and examiner persona ID

### Gate 2 — Image Quality Assessment (SWGIT)
- [ ] Evaluate resolution — document pixels per inch, dimensions
- [ ] Assess lighting conditions — direction, intensity, color temperature, shadows
- [ ] Assess pose angle — frontal, three-quarter, profile, or other
- [ ] Document obstructions — glasses, hats, facial hair, masks, motion blur
- [ ] Rate image quality: Good / Moderate / Poor / Unsuitable
- [ ] If either image is "Unsuitable" — STOP and issue "No Comparison Possible"

### Gate 3 — Image Preparation (SWGIT)
- [ ] Normalize orientation — align to consistent vertical axis
- [ ] Adjust only for visibility — brightness, contrast, sharpness to reveal existing detail only
- [ ] Log every adjustment made — tool used, parameters applied
- [ ] Verify no filters that alter facial geometry or proportions applied
- [ ] Scale images to comparable size for side-by-side analysis
- [ ] Confirm prohibited actions not taken: no AI enhancement, no compositing, no geometry alteration

### Gate 4 — Independent Morphological Feature Analysis (FISWG)
- [ ] Analyze Image A completely before examining Image B (prevent confirmation bias)
- [ ] Document face shape — oval, round, square, heart, oblong; jawline contour
- [ ] Document forehead — height, width, slope, hairline pattern
- [ ] Document eyebrows — shape, thickness, arch position, spacing
- [ ] Document eyes — shape, spacing (inter-pupillary), lid characteristics
- [ ] Document nose — bridge width, tip shape, nostril shape, length
- [ ] Document mouth — lip thickness, width, philtrum shape
- [ ] Document ears — size, shape, lobe attachment, helix pattern
- [ ] Document chin — shape, projection, dimple/cleft
- [ ] Document skin — scars, marks, moles, blemishes, texture
- [ ] Document facial hair — pattern, distribution (note: transient feature)
- [ ] Complete full Image A analysis before proceeding to Image B

### Gate 5 — Feature Comparison (FISWG)
- [ ] Place analyzed features in direct side-by-side comparison
- [ ] Rate each feature: Consistent / Inconsistent / Unable to Determine
- [ ] Account for expected variation: aging, weight, pose, lighting, quality, cosmetic changes
- [ ] Weight discriminating value — rare/distinctive features carry more weight
- [ ] Confirm no single feature used as sole basis for conclusion
- [ ] Document estimated time span between images if applicable

### Gate 6 — Standardized Conclusion (FISWG/OSAC)
- [ ] Issue exactly one conclusion from the standardized scale:
  - Identification (strongest positive)
  - Strong Support for Identification
  - Moderate Support for Identification
  - Inconclusive
  - Moderate Support for Exclusion
  - Strong Support for Exclusion
  - Exclusion (strongest negative)
- [ ] Verify conclusion is supported by documented feature analysis
- [ ] No conclusion issued without complete documentation

### Gate 7 — Report Generation
- [ ] Header: case ID, date, examiner persona ID, report version
- [ ] Authorization: what was requested and by whom
- [ ] Materials: all images with hash values
- [ ] Methodology statement: FISWG, SWGIT, OSAC standards cited
- [ ] Quality assessment findings for each image
- [ ] Image preparation log — all adjustments
- [ ] Feature analysis tables — independent analysis per image
- [ ] Comparison findings — feature-by-feature with consistency ratings
- [ ] Conclusion — one standardized determination
- [ ] Limitations statement — all factors limiting analysis
- [ ] Examiner qualification statement

### Gate 8 — Quality Assurance
- [ ] Blind verification by second qualified persona if available
- [ ] Conflict check — examiner has no prior bias or involvement
- [ ] Error rate disclosure — known limitations of morphological comparison
- [ ] All work product retained — notes, adjusted images, drafts

## Output Protocol

When photo comparison is performed, produce:
```
[FORENSIC PHOTO COMPARISON REPORT]
Case ID: [Unique identifier]
Examiner: FACIALEX
Date: [Analysis date]
Images Analyzed: [Count with hash values]
Image A Quality: [Good/Moderate/Poor/Unsuitable]
Image B Quality: [Good/Moderate/Poor/Unsuitable]
Features Compared: [Count]
  Consistent: [Count]
  Inconsistent: [Count]
  Unable to Determine: [Count]
Methodology: FISWG/SWGIT/OSAC
Conclusion: [Standardized determination]
Limitations: [Summary of limiting factors]
Admissibility Basis: Daubert — testable, peer-reviewed, known error rate, generally accepted
```

## Cross-References
- police-report-data-cross-reference (ADVOCIS — when photos appear in police reports)
- california-court-order-compliance-audit (REGULIS — when photos are court-submitted evidence)
- california-cps-child-welfare-audit (ADVOCIS — when photos involve child welfare cases)

## Standards Bodies Contact Reference
- FISWG: fiswg.org
- SWGIT: swgit.org
- OSAC/NIST: nist.gov/osac
- IAI: theiai.org (certification inquiries)
