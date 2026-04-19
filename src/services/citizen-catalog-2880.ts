/**
 * Citizen Catalog — 2,880 Named Positions
 *
 * 24 industries x 120 sub-industry positions = 2,880 total.
 * Each position uses Swedish/German/Cherokee-inspired naming.
 *
 * The math varies per sector:
 *   HEALTHCARE: 150, FINANCE: 153, MANUFACTURING: 162,
 *   PROFESSIONAL_SERVICES: 120, CONSTRUCTION: 120, TECHNOLOGY: 120,
 *   RETAIL: 120, TRANSPORTATION: 120, EDUCATION: 120, GOVERNMENT: 120,
 *   DEFENSE: 120, REAL_ESTATE: 105, UTILITIES: 105, AGRICULTURE: 120,
 *   WHOLESALE: 105, HOSPITALITY: 120, ENTERTAINMENT: 120,
 *   MINING: 105, ADMINISTRATIVE: 120, MANAGEMENT: 105,
 *   NONPROFIT: 105, PUBLIC_COMPANY: 120, OTHER_SERVICES: 105,
 *   GENERAL: 120
 *   TOTAL: 2,880
 *
 * Naming convention: {INDUSTRY_ROOT}-{SPECIALTY}
 *   Roots blend Swedish, German, and Cherokee language families.
 */

import { generateId } from "../utils/helpers.js";

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface CatalogPosition {
  id: string;
  citizenName: string;
  industry: string;
  subIndustry: string;
  naicsPrefix: string;
  domain: string;
  archetypeParent: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// NAICS subsector definitions per industry
// Each entry: [naicsPrefix, subIndustry description, specialty suffix]
// ═══════════════════════════════════════════════════════════════════════════

interface SubEntry {
  naics: string;
  sub: string;
  sfx: string;
}

// Helper to build entries
function e(naics: string, sub: string, sfx: string): SubEntry {
  return { naics, sub, sfx };
}

// ─── HEALTHCARE (150) — Root: VARD ──────────────────────────────────────
const HEALTHCARE_SUBS: SubEntry[] = [
  e("6211","Offices of Physicians","LAKRA"),e("6211","Offices of Physicians, General","HJART"),e("6211","Offices of Physicians, Mental Health","SINNE"),
  e("6211","Offices of Physicians, Pediatric","BARNA"),e("6211","Offices of Physicians, Surgical","SKARA"),e("6212","Offices of Dentists","TANDE"),
  e("6212","Offices of Dentists, General","MUNN"),e("6212","Offices of Dentists, Orthodontic","RETTA"),e("6212","Offices of Dentists, Pediatric","LITEN"),
  e("6212","Offices of Dentists, Oral Surgery","KIEFER"),e("6213","Offices of Other Health Practitioners","HELSE"),e("6213","Offices of Chiropractors","RYGG"),
  e("6213","Offices of Optometrists","BLICK"),e("6213","Offices of Mental Health Practitioners","ANDAN"),e("6213","Offices of Physical Therapists","STARKE"),
  e("6213","Offices of Occupational Therapists","HANDE"),e("6213","Offices of Speech Therapists","STIMM"),e("6213","Offices of Audiologists","OHREN"),
  e("6213","Offices of Podiatrists","FOTVA"),e("6214","Outpatient Care Centers","OPPEN"),e("6214","Family Planning Centers","FAMIL"),
  e("6214","Outpatient Mental Health Centers","FRIDD"),e("6214","HMO Medical Centers","GRUPP"),e("6214","Kidney Dialysis Centers","NJURE"),
  e("6214","Freestanding Emergency Centers","AKUTA"),e("6214","Freestanding Surgery Centers","SNITT"),e("6215","Medical and Diagnostic Laboratories","PROV"),
  e("6215","Medical Laboratories","BLOD"),e("6215","Diagnostic Imaging Centers","BILDE"),e("6215","Clinical Laboratories","KEMI"),
  e("6215","Reference Laboratories","REFER"),e("6216","Home Health Care Services","HEMVA"),e("6216","Home Nursing Services","PFLGE"),
  e("6216","Home Hospice Services","TRYST"),e("6216","Home Therapy Services","HEIMA"),e("6216","Home Infusion Services","DRIPP"),
  e("6219","Other Ambulatory Health Care","WANDR"),e("6219","Ambulance Services","RETTA"),e("6219","Blood and Organ Banks","GEBEN"),
  e("6219","Urgent Care Clinics","EILEN"),e("6221","General Medical and Surgical Hospitals","SJUKH"),e("6221","Teaching Hospitals","LEHRE"),
  e("6221","Community Hospitals","SAMHA"),e("6221","Critical Access Hospitals","NOTEN"),e("6221","Trauma Centers","WUNDE"),
  e("6222","Psychiatric and Substance Abuse Hospitals","PSYKE"),e("6222","Psychiatric Hospitals","GEIST"),e("6222","Substance Abuse Hospitals","RENSA"),
  e("6222","Residential Treatment Facilities","WOHNE"),e("6223","Specialty Hospitals","SARTD"),e("6223","Children's Hospitals","KINDE"),
  e("6223","Rehabilitation Hospitals","REHAB"),e("6223","Long Term Acute Care Hospitals","LANGA"),e("6223","Orthopedic Hospitals","BEIN"),
  e("6223","Cancer Hospitals","TUMRA"),e("6231","Nursing Care Facilities","ALTEN"),e("6231","Skilled Nursing Facilities","FLEGE"),
  e("6231","Intermediate Care Facilities","MITTL"),e("6231","Memory Care Units","MINNE"),e("6232","Residential Intellectual Disability Facilities","OMSRG"),
  e("6232","Community Care Facilities","DORFE"),e("6232","Assisted Living for Intellectual Disability","HILFE"),e("6232","Group Homes","HEMMA"),
  e("6233","Continuing Care Retirement Communities","ALDER"),e("6233","Independent Living Communities","FRITT"),e("6233","Assisted Living Facilities","STODJ"),
  e("6233","Life Plan Communities","LIVSV"),e("6239","Other Residential Care Facilities","BOEND"),e("6239","Residential Mental Health Facilities","LUGNA"),
  e("6239","Residential Substance Abuse Facilities","TORKA"),e("6239","Halfway Houses","HALVV"),e("6241","Individual and Family Services","SKOET"),
  e("6241","Child and Youth Services","UNGDO"),e("6241","Services for the Elderly","GAMML"),e("6241","Domestic Violence Services","SAKER"),
  e("6241","Emergency and Relief Services","NOTHF"),e("6242","Community Food and Housing Services","NAHRA"),e("6242","Food Banks","BROTD"),
  e("6242","Homeless Shelters","DACHH"),e("6242","Transitional Housing","BRUEK"),e("6243","Vocational Rehabilitation Services","ARBTE"),
  e("6243","Job Training Services","LERNA"),e("6243","Sheltered Workshops","WERKS"),e("6244","Child Day Care Services","DAGIS"),
  e("6244","Preschool Programs","FORSK"),e("6244","Before and After School Programs","MELLN"),e("6244","Head Start Programs","BORJA"),
  e("6211","Offices of Physicians, Cardiology","PULSA"),e("6211","Offices of Physicians, Dermatology","HUDEN"),e("6211","Offices of Physicians, Endocrinology","DRUSE"),
  e("6211","Offices of Physicians, Gastroenterology","MAGEN"),e("6211","Offices of Physicians, Nephrology","NIERA"),e("6211","Offices of Physicians, Neurology","NERVA"),
  e("6211","Offices of Physicians, Oncology","KREBZ"),e("6211","Offices of Physicians, Ophthalmology","AUGEN"),e("6211","Offices of Physicians, Orthopedic","KNOCN"),
  e("6211","Offices of Physicians, Pulmonology","LUNGA"),e("6211","Offices of Physicians, Radiology","STRHL"),e("6211","Offices of Physicians, Rheumatology","GELEK"),
  e("6211","Offices of Physicians, Urology","FLUSS"),e("6214","Outpatient Pain Management Centers","LNDRN"),e("6214","Outpatient Wound Care Centers","HEILN"),
  e("6215","Genetic Testing Laboratories","GENKD"),e("6215","Toxicology Laboratories","GIFTA"),e("6221","General Hospitals, Rural","LANDH"),
  e("6221","General Hospitals, Urban","STADT"),e("6223","Cardiac Hospitals","HERZK"),e("6223","Eye Hospitals","SEHEN"),
  e("6231","Nursing Facilities, Dementia Care","VERGS"),e("6231","Nursing Facilities, Ventilator","ATEMN"),e("6219","Ambulatory Surgical Transport","FERDE"),
  e("6214","Telehealth Service Centers","FJARN"),e("6211","Offices of Physicians, Sports Medicine","IDROT"),e("6213","Offices of Acupuncturists","NALDV"),
  e("6213","Offices of Naturopathic Physicians","NATUR"),e("6219","Health Screening Services","PRUFE"),e("6244","Infant Care Programs","SPADB"),
  e("6241","Crisis Intervention Services","KRISA"),e("6233","Memory Care Communities","TANKE"),e("6223","Burn Treatment Centers","BRAND"),
  e("6214","Comprehensive Outpatient Rehab","GANZH"),e("6215","Pathology Laboratories","VAVND"),e("6219","Mobile Health Clinics","RULLA"),
  e("6216","Home Palliative Care","LINDRA"),e("6216","Home Medical Equipment Services","GERAT"),e("6232","Adult Day Health Centers","TAGEN"),
  e("6239","Sober Living Homes","NYVAK"),e("6241","Refugee Resettlement Services","ASYLA"),e("6214","Sleep Disorder Centers","SOMNA"),
  e("6211","Offices of Physicians, Geriatric","GREIS"),e("6211","Offices of Physicians, Allergy","POLLA"),e("6213","Offices of Dietitians","KOSTA"),
  e("6213","Offices of Genetic Counselors","ARVSD"),e("6211","Offices of Physicians, OB/GYN","FODEL"),e("6214","Outpatient Infusion Centers","TROPF"),
  e("6219","Organ Procurement Organizations","DONRA"),e("6223","Psychiatric Children's Hospitals","BARNG"),e("6231","Skilled Nursing, Post-Acute","GENSN"),
  e("6214","Community Health Centers","FOLKH"),e("6214","Migrant Health Centers","VAGAR"),e("6214","Federally Qualified Health Centers","BUNDA"),
  e("6219","Poison Control Centers","TOXIK"),e("6244","Special Needs Childcare","SARSK"),e("6241","Adoption Services","VAXTA"),
  e("6241","Foster Care Services","PFLEG"),
  e("6211","Offices of Physicians, Pain Management","SMRTV"),e("6213","Offices of Respiratory Therapists","ANDVR"),e("6214","Outpatient Cardiac Rehab Centers","HJRTB"),
  e("6219","Nurse Triage Services","TRGRN"),e("6232","Residential Autism Services","AUTMV"),
];

// ─── FINANCE (153) — Root: SCHATZ ───────────────────────────────────────
const FINANCE_SUBS: SubEntry[] = [
  e("5221","Depository Credit Intermediation","BANKE"),e("5221","Commercial Banking","HANDL"),e("5221","Savings Institutions","SPARA"),
  e("5221","Credit Unions","VERBN"),e("5221","Industrial Banks","WERKE"),e("5222","Nondepository Credit Intermediation","KREDT"),
  e("5222","Credit Card Issuing","KARTE"),e("5222","Sales Financing","KAUFE"),e("5222","Consumer Lending","BORGA"),
  e("5222","Real Estate Credit","GRUND"),e("5222","International Trade Financing","WELTA"),e("5222","Secondary Market Financing","ZWEIT"),
  e("5223","Activities Related to Credit Intermediation","MITTL"),e("5223","Mortgage and Nonmortgage Loan Brokers","MAKLA"),e("5223","Financial Transaction Processing","FLODE"),
  e("5223","Check Cashing Services","LOESN"),e("5231","Securities and Commodity Contracts","BORSE"),e("5231","Investment Banking","ANLGE"),
  e("5231","Securities Brokerage","AKTIE"),e("5231","Commodity Contracts Brokerage","WAREN"),e("5231","Options Dealing","WAHLE"),
  e("5231","Futures Dealing","TERMI"),e("5232","Securities and Commodity Exchanges","MARKT"),e("5232","Stock Exchanges","TAUSC"),
  e("5232","Commodity Exchanges","ROHST"),e("5239","Other Financial Investment Activities","FONDS"),e("5239","Investment Advice","RATGB"),
  e("5239","Portfolio Management","PFLEG"),e("5239","Investment Banking Advisory","FUHRE"),e("5239","Trust Administration","TREUH"),
  e("5239","Wealth Management","RIKDO"),e("5241","Insurance Carriers","VERSI"),e("5241","Direct Life Insurance","LEBEN"),
  e("5241","Direct Health Insurance","HELSE"),e("5241","Direct Property Insurance","EIGEN"),e("5241","Direct Casualty Insurance","SCHDN"),
  e("5241","Direct Title Insurance","TITEL"),e("5241","Direct Flood Insurance","FLUTE"),e("5242","Agencies, Brokerages, and Related","AGENT"),
  e("5242","Insurance Agencies","BUERO"),e("5242","Insurance Brokerages","SENDE"),e("5242","Claims Adjusting","PRUEF"),
  e("5242","Third Party Administration","DRITT"),e("5251","Insurance and Employee Benefit Funds","NUTZE"),e("5251","Pension Funds","RENTE"),
  e("5251","Health and Welfare Funds","WOHLA"),e("5251","Employee Benefit Funds","VORTE"),e("5259","Other Investment Pools","POOLE"),
  e("5259","Open-End Investment Funds","OFFNE"),e("5259","Unit Investment Trusts","ANTEI"),e("5259","Real Estate Investment Trusts","IMMOB"),
  e("5259","Closed-End Investment Funds","SCHLI"),e("5221","International Banking","GLOBA"),e("5221","Private Banking","PRIVA"),
  e("5221","Community Banking","GEMEI"),e("5221","Online Banking","DIGIT"),e("5221","Correspondent Banking","KORRE"),
  e("5222","Auto Lending","FAHRZ"),e("5222","Student Lending","STUDN"),e("5222","Microfinance","KLEIN"),
  e("5222","Peer-to-Peer Lending","GLEIC"),e("5223","Payment Processing","ZAHLE"),e("5223","Clearinghouse Services","ABREC"),
  e("5223","ACH Network Processing","NETZE"),e("5231","Municipal Securities","KOMMU"),e("5231","Government Securities","STAAT"),
  e("5231","Mortgage-Backed Securities","HYPOT"),e("5231","Corporate Bond Trading","ANLEI"),e("5231","Derivatives Trading","ABLEI"),
  e("5231","Dark Pool Trading","DUNKE"),e("5239","Venture Capital","WAGNI"),e("5239","Private Equity","EIGEN"),
  e("5239","Hedge Fund Management","ABSIC"),e("5239","Fund of Funds","DACHS"),e("5239","Family Office Services","FAMLI"),
  e("5239","Robo-Advisory","MASKI"),e("5239","Quantitative Trading","RECHK"),e("5241","Reinsurance Carriers","RUECK"),
  e("5241","Surety Carriers","BUERR"),e("5241","Workers Compensation Insurance","ARBNS"),e("5241","Professional Liability Insurance","BERUF"),
  e("5241","Cyber Insurance","NETZS"),e("5241","Marine Insurance","SCHIF"),e("5241","Aviation Insurance","FLUGE"),
  e("5242","Surplus Lines Brokers","UEBER"),e("5242","Managing General Agents","HAUPT"),e("5242","Reinsurance Brokers","RUCKV"),
  e("5242","Claims Processing Services","BEARB"),e("5251","Defined Benefit Plans","FESTL"),e("5251","Defined Contribution Plans","BEITR"),
  e("5251","403b Plans","BILDU"),e("5251","Multiemployer Plans","TARIG"),e("5259","Exchange-Traded Funds","BORSG"),
  e("5259","Money Market Funds","GELDM"),e("5259","Commodity Pools","ROHPO"),e("5259","Venture Capital Trusts","GRUDT"),
  e("5222","Payday Lending","VORSC"),e("5222","Equipment Financing","AUSRU"),e("5222","Factoring Services","FAKTO"),
  e("5223","Wire Transfer Services","DRAHT"),e("5223","Foreign Exchange Services","DEVSE"),e("5223","Escrow Services","TREUE"),
  e("5231","Equity Research","FORSC"),e("5231","Prime Brokerage","PRIME"),e("5239","Impact Investing","WIRKU"),
  e("5239","ESG Fund Management","NACHH"),e("5239","Cryptocurrency Exchange","KRYPT"),e("5239","Digital Asset Custody","BEWAH"),
  e("5241","Parametric Insurance","PARAM"),e("5241","Captive Insurance","EIGEN"),e("5241","Crop Insurance","ERNTE"),
  e("5241","Pet Insurance","TIERV"),e("5242","Insurtech Platforms","NEUEV"),e("5242","Loss Control Services","VERLU"),
  e("5251","Taft-Hartley Funds","GEWRK"),e("5251","Government Pension Funds","STTRN"),e("5259","Interval Funds","ZEITF"),
  e("5259","Business Development Companies","ENTWR"),e("5221","Tribal Banking","STAMB"),e("5221","De Novo Banks","NEUBA"),
  e("5222","Agricultural Lending","AGRAR"),e("5222","SBA Lending","BUNDK"),e("5223","Merchant Services","HAEND"),
  e("5231","Structured Products","STRUK"),e("5231","Convertible Securities","WANDL"),e("5239","Separately Managed Accounts","EINZL"),
  e("5239","Fiduciary Services","GETRU"),e("5241","Excess and Surplus Lines","EXTRA"),e("5241","Group Life Insurance","GRUPL"),
  e("5241","Long-Term Care Insurance","PFLEG"),e("5242","Program Administrators","PROGV"),e("5259","Tender Offer Funds","ANGBT"),
  e("5259","Tax-Exempt Bond Funds","STFRE"),e("5221","Bankers Bank Services","ZNTRL"),e("5222","Commercial Mortgage Lending","GEWHP"),
  e("5231","Fixed Income Trading","FESTV"),e("5239","Endowment Management","STIFT"),e("5241","Specialty Insurance","SPZLV"),
  e("5242","Wholesale Insurance","GROSS"),e("5251","ESOP Administration","MITAR"),e("5259","Balanced Funds","AUSGW"),
  e("5221","Federal Home Loan Banks","BUNDH"),e("5221","Farm Credit System","AGRKR"),e("5239","Registered Investment Advisers","ZUGEL"),
  e("5239","Commodity Trading Advisors","ROHBR"),e("5241","Mortgage Guaranty Insurance","HYPGR"),e("5259","Target Date Funds","ZIELD"),
  e("5222","Bridge Lending","BRUEK"),e("5222","Warehouse Lending","LAGER"),e("5223","Loan Servicing","DIENL"),
  e("5231","Repo Trading","PENSN"),e("5239","Multi-Family Office","MEHRF"),e("5241","Annuity Products","RENTP"),
];

// ─── MANUFACTURING (162) — Root: STAL ───────────────────────────────────
const MANUFACTURING_SUBS: SubEntry[] = [
  e("3111","Animal Food Manufacturing","FODER"),e("3112","Grain and Oilseed Milling","KVRNA"),e("3113","Sugar and Confectionery","SOKER"),
  e("3114","Fruit and Vegetable Preserving","SYLTA"),e("3115","Dairy Product Manufacturing","MJOLK"),e("3116","Animal Slaughtering","SLAKT"),
  e("3117","Seafood Product Preparation","FISKE"),e("3118","Bakeries and Tortilla","BAGER"),e("3119","Other Food Manufacturing","KOCHE"),
  e("3121","Beverage Manufacturing","BRYGG"),e("3122","Tobacco Manufacturing","TABAK"),e("3131","Fiber, Yarn, and Thread Mills","GARNE"),
  e("3132","Fabric Mills","STOFF"),e("3133","Textile and Fabric Finishing","FARBE"),e("3141","Textile Furnishings Mills","WEBEN"),
  e("3149","Other Textile Product Mills","NAHEN"),e("3151","Apparel Knitting Mills","STRIK"),e("3152","Cut and Sew Apparel","SNITT"),
  e("3159","Apparel Accessories","HUTMA"),e("3161","Leather and Hide Tanning","LEDER"),e("3162","Footwear Manufacturing","SCHUH"),
  e("3169","Other Leather Products","RIEMN"),e("3211","Sawmills and Wood Preservation","SAGVR"),e("3212","Veneer and Plywood","FANRE"),
  e("3219","Other Wood Product Manufacturing","HOLZE"),e("3221","Pulp, Paper, and Paperboard Mills","PAPIR"),e("3222","Converted Paper Products","KARTN"),
  e("3231","Printing and Related Support","DRUCK"),e("3241","Petroleum and Coal Products","ERDOL"),e("3251","Basic Chemical Manufacturing","KEMIE"),
  e("3252","Resin and Synthetic Rubber","HARZE"),e("3253","Pesticide and Fertilizer","DUNGT"),e("3254","Pharmaceutical Manufacturing","MEDKM"),
  e("3255","Paint, Coating, and Adhesive","LACKE"),e("3256","Soap and Cleaning Compound","SEIFE"),e("3259","Other Chemical Products","MISCH"),
  e("3261","Plastics Product Manufacturing","PLAST"),e("3262","Rubber Product Manufacturing","GUMMI"),e("3271","Clay and Refractory","TONWR"),
  e("3272","Glass and Glass Product","GLASS"),e("3273","Cement and Concrete","BETON"),e("3274","Lime and Gypsum","KALKE"),
  e("3279","Other Nonmetallic Mineral","MINER"),e("3311","Iron and Steel Mills","EISNW"),e("3312","Steel Product from Purchased Steel","WALZE"),
  e("3313","Alumina and Aluminum","ALUMR"),e("3314","Nonferrous Metal, Except Aluminum","KUPFE"),e("3315","Foundries","GIESS"),
  e("3321","Forging and Stamping","SCHMD"),e("3322","Cutlery and Handtool","KLINGN"),e("3323","Architectural and Structural Metals","TRAGA"),
  e("3324","Boiler, Tank, and Shipping Container","KESSL"),e("3325","Hardware Manufacturing","BESCH"),e("3326","Spring and Wire Product","FEDER"),
  e("3327","Machine Shops and Threaded Product","DREHN"),e("3328","Coating, Engraving, and Heat Treating","HARTG"),e("3329","Other Fabricated Metal","FERTG"),
  e("3331","Agriculture and Construction Machinery","PFLUQ"),e("3332","Industrial Machinery","GETRI"),e("3333","Commercial and Service Machinery","DIENN"),
  e("3334","HVAC and Commercial Refrigeration","KUHLR"),e("3335","Metalworking Machinery","FRASE"),e("3336","Engine, Turbine, and Power","KRAFT"),
  e("3339","Other General Purpose Machinery","PUMPE"),e("3341","Computer and Peripheral Equipment","RECHM"),e("3342","Communications Equipment","FUNKG"),
  e("3343","Audio and Video Equipment","SCHLL"),e("3344","Semiconductor and Electronic Component","CHIPS"),e("3345","Navigational and Control Instruments","KOMPS"),
  e("3346","Manufacturing and Reproducing Magnetic Media","SPEIR"),e("3351","Electric Lighting Equipment","LAMPE"),e("3352","Household Appliance","WASCH"),
  e("3353","Electrical Equipment","MOTOR"),e("3359","Other Electrical Equipment","DRAHT"),e("3361","Motor Vehicle Manufacturing","FAHRZ"),
  e("3362","Motor Vehicle Body and Trailer","KAROS"),e("3363","Motor Vehicle Parts","TEILE"),e("3364","Aerospace Product and Parts","FLUGZ"),
  e("3365","Railroad Rolling Stock","ZUGWR"),e("3366","Ship and Boat Building","WERFT"),e("3369","Other Transportation Equipment","FAHRR"),
  e("3371","Household and Institutional Furniture","MOBEL"),e("3372","Office Furniture","TISCH"),e("3379","Other Furniture Related","STUHL"),
  e("3391","Medical Equipment and Supplies","HEILG"),e("3399","Other Miscellaneous Manufacturing","SONST"),
  // Extended to reach 180
  e("3111","Pet Food Manufacturing","HUNTE"),e("3112","Flour Milling","MEHLE"),e("3112","Rice Milling","REISE"),
  e("3113","Chocolate Manufacturing","KAKAO"),e("3114","Frozen Food Manufacturing","FROST"),e("3115","Cheese Manufacturing","KASEM"),
  e("3115","Ice Cream Manufacturing","EISMA"),e("3116","Meat Processing","FLEIR"),e("3117","Canned Seafood","DOSEN"),
  e("3118","Commercial Bakeries","BROTW"),e("3118","Frozen Bakery Products","KALTB"),e("3119","Snack Food Manufacturing","KNABB"),
  e("3119","Coffee and Tea Manufacturing","KAFFE"),e("3119","Spice and Extract Manufacturing","WURZE"),e("3121","Brewery Operations","BIERB"),
  e("3121","Winery Operations","WEINR"),e("3121","Distillery Operations","BRENN"),e("3121","Soft Drink Manufacturing","LIMON"),
  e("3254","Biopharmaceutical Manufacturing","BIOPH"),e("3254","Generic Drug Manufacturing","GENRK"),e("3254","Vaccine Manufacturing","IMPFM"),
  e("3254","Medical Device Drug Combination","KOMBM"),e("3261","Medical Plastics","MEDPL"),e("3261","Packaging Plastics","PACKP"),
  e("3262","Tire Manufacturing","REIFN"),e("3262","Industrial Rubber Products","INDGM"),e("3273","Ready-Mix Concrete","MISCH"),
  e("3273","Precast Concrete","FORMB"),e("3311","Specialty Steel","SONDRS"),e("3311","Stainless Steel","NIRSTA"),
  e("3313","Aluminum Extrusion","PRESS"),e("3313","Aluminum Sheet and Plate","BLECH"),e("3314","Copper Manufacturing","KUPFR"),
  e("3314","Titanium Manufacturing","TITAN"),e("3321","Precision Forging","GENAU"),e("3323","Structural Steel Fabrication","TRAEG"),
  e("3323","Metal Building Manufacturing","HALLE"),e("3324","Pressure Vessel Manufacturing","DRCKB"),e("3327","CNC Machining","FRASM"),
  e("3327","Precision Grinding","FEINM"),e("3329","Powder Metallurgy","PULVM"),e("3331","Mining Machinery","BERMA"),
  e("3332","Conveyor Manufacturing","FOERD"),e("3334","Industrial Refrigeration","KALTM"),e("3335","Laser Cutting Equipment","LASMN"),
  e("3336","Gas Turbine Manufacturing","TURBN"),e("3341","Server Manufacturing","SERVR"),e("3341","Storage Device Manufacturing","DATSP"),
  e("3342","Network Equipment Manufacturing","NETZG"),e("3342","Satellite Communications Equipment","SATLT"),e("3344","Integrated Circuit Manufacturing","WAFER"),
  e("3344","Printed Circuit Board Manufacturing","PLATI"),e("3345","Process Control Instruments","REGLR"),e("3345","Test and Measurement Equipment","MESGR"),
  e("3351","LED Lighting Manufacturing","LICHT"),e("3352","Major Appliance Manufacturing","GRSGR"),e("3353","Transformer Manufacturing","UMSPN"),
  e("3353","Switchgear Manufacturing","SCHLT"),e("3359","Battery Manufacturing","AKKUM"),e("3359","Wire and Cable Manufacturing","KABEL"),
  e("3361","Electric Vehicle Manufacturing","EFAHZ"),e("3361","Heavy Truck Manufacturing","LASTR"),e("3362","Bus Manufacturing","BUSBW"),
  e("3363","Brake System Manufacturing","BREMS"),e("3363","Transmission Manufacturing","GETBM"),e("3364","Aircraft Engine Manufacturing","TRWRK"),
  e("3364","Spacecraft Manufacturing","RAUMF"),e("3366","Commercial Shipbuilding","GROSF"),e("3366","Yacht Building","JACHT"),
  e("3371","Mattress Manufacturing","BETTM"),e("3391","Surgical Instrument Manufacturing","CHIRU"),e("3391","Dental Equipment Manufacturing","ZAHNM"),
  e("3391","Prosthetic Manufacturing","PROTH"),e("3399","Jewelry Manufacturing","JUWEL"),e("3399","Sporting Goods Manufacturing","SPORT"),
  e("3399","Toy Manufacturing","SPIEL"),
];

// ─── PROFESSIONAL_SERVICES (120) — Root: FACHK ──────────────────────────
const PROFESSIONAL_SERVICES_SUBS: SubEntry[] = [
  e("5411","Legal Services","RATTE"),e("5411","Law Offices","ANZLT"),e("5411","Title Companies","GRNDV"),
  e("5411","Paralegal Services","RECHP"),e("5412","Accounting and Tax Preparation","BUCHE"),e("5412","CPA Firms","PRUFA"),
  e("5412","Payroll Services","LOHNA"),e("5412","Bookkeeping Services","KONTN"),e("5412","Tax Preparation","STEUE"),
  e("5413","Architectural Services","BAUPL"),e("5413","Landscape Architecture","GARTN"),e("5413","Interior Design","INNEN"),
  e("5413","Industrial Design","INDST"),e("5414","Specialized Design Services","ENTWD"),e("5414","Graphic Design","GRAFK"),
  e("5414","Fashion Design","MODEA"),e("5414","Exhibit Design","AUSST"),e("5415","Computer Systems Design","PROGR"),
  e("5415","Custom Software Development","KODER"),e("5415","IT Consulting","BERIT"),e("5415","Systems Integration","VERBM"),
  e("5416","Management Consulting","BERAT"),e("5416","Strategy Consulting","STRGA"),e("5416","Operations Consulting","WERKB"),
  e("5416","HR Consulting","PERSO"),e("5416","Marketing Consulting","MARKB"),e("5417","Scientific Research, Physical","FORSP"),
  e("5417","Scientific Research, Life Sciences","BIOLB"),e("5417","Scientific Research, Social","SOZLF"),e("5417","Engineering Research","INGFR"),
  e("5418","Advertising and Public Relations","WERBN"),e("5418","Advertising Agencies","AGENW"),e("5418","Media Buying","KAUFM"),
  e("5418","Public Relations","PRESS"),e("5418","Direct Mail Advertising","POSTN"),e("5419","Market Research","MFRSC"),
  e("5419","Photography Studios","BILDR"),e("5419","Translation Services","DOLMT"),e("5419","Veterinary Services","TIERM"),
  e("5413","Civil Engineering","BRCKN"),e("5413","Structural Engineering","TRAGK"),e("5413","Mechanical Engineering","MASCH"),
  e("5413","Electrical Engineering","ELKTK"),e("5413","Environmental Engineering","UMWLT"),e("5413","Geotechnical Engineering","BODEN"),
  e("5413","Chemical Engineering","CHEME"),e("5413","Biomedical Engineering","BIOMD"),e("5414","UX Design","NUTZE"),
  e("5414","Sound Design","KLANG"),e("5415","Cybersecurity Consulting","SCHTZ"),e("5415","Cloud Consulting","WOLKE"),
  e("5415","Data Analytics Consulting","DATEN"),e("5415","AI and Machine Learning Consulting","KUNSB"),e("5415","ERP Implementation","PLANR"),
  e("5416","Financial Advisory","FINZB"),e("5416","Risk Consulting","RISIK"),e("5416","Supply Chain Consulting","KETTE"),
  e("5416","Change Management Consulting","WANDB"),e("5416","Sustainability Consulting","GRUEN"),e("5417","Clinical Research Organizations","KLNFO"),
  e("5417","Materials Science Research","WERKF"),e("5417","Agricultural Research","AGRFO"),e("5418","Digital Marketing","NETZM"),
  e("5418","Branding Services","MARKN"),e("5418","Communications Strategy","KOMSB"),e("5419","Environmental Consulting","OEKOL"),
  e("5419","Actuarial Services","VERSM"),e("5419","Forensic Accounting","SPURN"),e("5419","Patent Agency","SCHUV"),
  e("5411","Immigration Law","EINWN"),e("5411","Bankruptcy Law","INSOL"),e("5411","Environmental Law","UMWLR"),
  e("5411","IP and Patent Law","PATEN"),e("5411","Employment Law","ARBTR"),e("5411","Real Estate Law","IMMOR"),
  e("5412","Audit Firms","PRUFG"),e("5412","Forensic Accounting Firms","AUFSP"),e("5412","Government Accounting","STAAT"),
  e("5413","Fire Protection Engineering","BRAND"),e("5413","Transportation Engineering","VERKR"),e("5413","Surveying Services","VERMS"),
  e("5415","DevOps Consulting","AUTOM"),e("5415","Blockchain Consulting","KETTN"),e("5415","Quality Assurance","TESTB"),
  e("5416","Healthcare Consulting","GESUN"),e("5416","Education Consulting","BILDB"),e("5416","Government Consulting","VERWB"),
  e("5417","Aerospace Research","RAUMF"),e("5417","Energy Research","ENRGF"),e("5417","Oceanographic Research","MEERB"),
  e("5418","Influencer Marketing","STERNB"),e("5418","Event Marketing","VERAN"),e("5419","Appraisal Services","BEWRT"),
  e("5419","Licensing Services","LIZNG"),e("5419","Training and Development","LEHRN"),e("5419","Executive Coaching","FUHRB"),
  e("5411","Family Law","FAMLA"),e("5411","Criminal Defense","VERTD"),e("5411","Tax Law","ABGAB"),
  e("5412","International Tax","WELTB"),e("5413","Nuclear Engineering","KERNB"),e("5415","Database Administration","DBNKB"),
  e("5416","IT Strategy","DIGIB"),e("5416","Mergers and Acquisitions","FUSIA"),e("5417","Pharmaceutical Research","PHRMF"),
  e("5418","Social Media Marketing","SOZIM"),e("5418","Content Marketing","INHLT"),e("5419","Arbitration Services","SCHID"),
  e("5419","Mediation Services","VERMB"),e("5419","Expert Witness Services","GUTAC"),e("5411","Securities Law","BORSR"),
  e("5412","Cost Accounting","KALKU"),e("5413","Acoustic Engineering","SCHLA"),e("5415","Managed IT Services","DIELL"),
  e("5416","Lean Six Sigma Consulting","SCHLK"),e("5417","Biotechnology Research","BIOTF"),e("5418","SEO Services","SUCHN"),
  e("5419","Lobbying Services","EINFL"),e("5419","Genealogical Research","AHNEN"),
  e("5416","Sustainability Consulting","HALLBR"),
];

// ─── CONSTRUCTION (120) — Root: STEIN ────────────────────────────────────
const CONSTRUCTION_SUBS: SubEntry[] = [
  e("2361","Residential Building Construction","HAUSR"),e("2361","Single Family Home Construction","EINFL"),e("2361","Multifamily Construction","MEHRW"),
  e("2361","Custom Home Building","EIGNH"),e("2361","Modular Home Construction","MODUL"),e("2362","Nonresidential Building Construction","GEWERB"),
  e("2362","Commercial Building Construction","BUERO"),e("2362","Industrial Building Construction","FABRI"),e("2362","Institutional Building Construction","ANSTL"),
  e("2362","Healthcare Facility Construction","KLINK"),e("2362","Education Facility Construction","SCHULB"),e("2371","Utility System Construction","LEITN"),
  e("2371","Water and Sewer Line Construction","ROHRE"),e("2371","Power Line Construction","STROM"),e("2371","Pipeline Construction","PIPEN"),
  e("2371","Telecommunications Line Construction","FASER"),e("2372","Land Subdivision","GRUND"),e("2373","Highway, Street, and Bridge Construction","BRCKB"),
  e("2373","Road Construction","STRSS"),e("2373","Bridge Construction","BRCKN"),e("2373","Tunnel Construction","TUNNL"),
  e("2379","Other Heavy Construction","SCHWER"),e("2379","Dam Construction","STAUD"),e("2379","Flood Control Construction","DEICH"),
  e("2381","Foundation and Structure Contractors","FUNDM"),e("2381","Piling Contractors","PFAHB"),e("2381","Structural Steel Erectors","MONTG"),
  e("2381","Concrete Contractors","BETONB"),e("2382","Building Equipment Contractors","INSTL"),e("2382","Electrical Contractors","ELKTR"),
  e("2382","Plumbing Contractors","KLMPR"),e("2382","HVAC Contractors","HEIZT"),e("2382","Fire Protection Contractors","LOSCN"),
  e("2383","Building Finishing Contractors","AUSBR"),e("2383","Drywall Contractors","TRCKN"),e("2383","Painting Contractors","MALAB"),
  e("2383","Flooring Contractors","BODNB"),e("2383","Tile and Terrazzo Contractors","FLISN"),e("2389","Other Specialty Trade Contractors","SONDH"),
  e("2389","Site Preparation Contractors","ERDBT"),e("2389","Structural Moving and Demolition","ABRSB"),e("2389","Scaffolding Contractors","GERST"),
  e("2389","Insulation Contractors","DAMMT"),e("2389","Roofing Contractors","DACHB"),e("2389","Siding Contractors","FASSB"),
  e("2389","Glass and Glazing Contractors","GLASB"),e("2389","Fence Contractors","ZAUNB"),e("2389","Elevator Installation","AUFZG"),
  e("2362","Data Center Construction","RECHZ"),e("2362","Laboratory Construction","LABOB"),e("2362","Hotel Construction","HOTEL"),
  e("2362","Retail Construction","LADEN"),e("2362","Restaurant Construction","GASTH"),e("2362","Warehouse Construction","LAGEB"),
  e("2362","Religious Building Construction","KIRCH"),e("2373","Airport Construction","FLUGB"),e("2373","Railroad Construction","GLESB"),
  e("2373","Marine Construction","HAFNB"),e("2379","Mining Support Construction","BERGB"),e("2379","Environmental Remediation","SANIR"),
  e("2381","Masonry Contractors","MAURB"),e("2381","Framing Contractors","ZIMMR"),e("2382","Mechanical Contractors","MECHN"),
  e("2382","Low Voltage Contractors","SCHWB"),e("2382","Solar Installation Contractors","SONNB"),e("2383","Acoustic Contractors","SCHAB"),
  e("2383","Cabinetry and Millwork","TISCB"),e("2389","Waterproofing Contractors","DICHB"),e("2389","Landscaping Contractors","GRUNA"),
  e("2389","Paving Contractors","ASPHB"),e("2389","Drilling Contractors","BOHRB"),e("2361","Townhouse Construction","REIHB"),
  e("2361","Accessory Dwelling Construction","NBENB"),e("2362","Parking Structure Construction","PARKB"),e("2362","Sports Facility Construction","SPORB"),
  e("2371","Natural Gas Distribution Construction","GASLT"),e("2373","Interchange Construction","KREUZ"),e("2379","Levee Construction","DAMMB"),
  e("2381","Precast Erection Contractors","FRTGB"),e("2382","Sprinkler System Contractors","SPRNH"),e("2383","Stucco Contractors","PUTZB"),
  e("2389","Blasting Contractors","SPRNG"),e("2389","Concrete Cutting and Sawing","SCHNB"),e("2361","Green Building Construction","OEKOB"),
  e("2362","Clean Room Construction","REINB"),e("2362","Cold Storage Construction","KALTB"),e("2371","Fiber Optic Installation","GLASF"),
  e("2379","Wetland Mitigation Construction","MOORS"),e("2382","Building Automation Contractors","AUTMB"),e("2389","Signage Installation","SCHIDB"),
  e("2361","Passive House Construction","PASSB"),e("2362","Tenant Improvement Construction","MIETB"),
  e("2361","Log Home Construction","TIMMB"),e("2361","Manufactured Home Installation","MONTRB"),e("2361","Historic Restoration","ANTIKB"),
  e("2361","Barn Construction","LADUB"),e("2362","Hotel Construction","GSTVB"),e("2362","Data Center Construction","SERVHB"),
  e("2362","School Construction","SKOLBB"),e("2362","Hospital Construction","SJKHB"),e("2371","Water Main Construction","VATLD"),
  e("2371","Sewer Line Construction","KLOKB"),e("2371","Power Line Construction","ELKRB"),e("2373","Runway Construction","BANAB"),
  e("2373","Railroad Construction","RALBV"),e("2379","Seawall Construction","KAJBB"),e("2379","Tunnel Construction","GNGVB"),
  e("2381","Foundation Contractors","GRUNDB"),e("2381","Structural Steel Erection","STLRB"),e("2381","Concrete Contractors","GJUTB"),
  e("2382","Elevator Installation","HISSB"),e("2382","Solar Panel Installation","SOLPB"),e("2382","Fire Alarm Installation","LARMB"),
  e("2383","Drywall Contractors","GIPSVB"),e("2383","Acoustic Ceiling Contractors","LJUDTB"),e("2383","Terrazzo Contractors","GOLVRB"),
  e("2389","Demolition Contractors","RIVNB"),e("2389","Scaffolding Contractors","STALLB"),e("2389","Environmental Remediation Construction","SANRB"),
  e("2389","Crane Services","KRANB"),
];

// ─── TECHNOLOGY (120) — Root: KRAFT ─────────────────────────────────────
const TECHNOLOGY_SUBS: SubEntry[] = [
  e("5112","Software Publishers","KODER"),e("5112","Operating Systems Publishers","SYSTA"),e("5112","Database Software","DBANK"),
  e("5112","Business Application Software","VERWA"),e("5112","Game Software Publishers","SPEIL"),e("5112","Security Software","SCHTZ"),
  e("5112","Educational Software","LERNP"),e("5112","Healthcare Software","GESUP"),e("5121","Data Processing Services","DATVA"),
  e("5121","Data Entry Services","EINGB"),e("5121","Data Conversion Services","UMBAU"),e("5121","Outsourced Data Processing","AUSLG"),
  e("5182","Data Storage Services","SPEHR"),e("5182","Cloud Storage Providers","WOLKS"),e("5182","Backup and Recovery Services","SICHG"),
  e("5182","Colocation Hosting","STELL"),e("5182","Managed Hosting","VERWH"),e("5182","Content Delivery Networks","VERTL"),
  e("5191","Web Search Portals","SUCHN"),e("5191","Internet Publishing","NETZV"),e("5191","Social Networking Platforms","SOZLN"),
  e("5191","Online Marketplaces","MARKP"),e("5191","Streaming Media Services","STROM"),e("5112","CRM Software","KUNDB"),
  e("5112","ERP Software","PLANR"),e("5112","Supply Chain Software","KETTN"),e("5112","Project Management Software","PROJK"),
  e("5112","Accounting Software","BUCHP"),e("5112","HR Management Software","PERSP"),e("5112","Collaboration Software","TEAMN"),
  e("5171","Wired Telecommunications","KABLK"),e("5171","Fiber Optic Networks","GLASN"),e("5171","Cable Television","FERNK"),
  e("5172","Wireless Telecommunications","FUNKN"),e("5172","Cellular Networks","MOBLN"),e("5172","Satellite Communications","SATLT"),
  e("5172","Paging Services","RUFDI"),e("5173","Telecommunications Resellers","WIEDV"),e("5174","Internet Service Providers","ZUGNG"),
  e("5174","Broadband Providers","BREIT"),e("5179","Other Telecommunications","SONSTK"),e("5112","AI and ML Platforms","KUNSM"),
  e("5112","Blockchain Platforms","KETBK"),e("5112","IoT Platforms","DINGN"),e("5112","Robotic Process Automation","ROBOTB"),
  e("5112","Low-Code Development Platforms","BAUKA"),e("5112","API Management Platforms","SCHNP"),e("5112","DevOps Tools","AUTMW"),
  e("5112","Testing and QA Software","PRUFS"),e("5182","Edge Computing Services","RANDR"),e("5182","Hybrid Cloud Services","MISCH"),
  e("5182","Serverless Computing","DIENR"),e("5182","Container Orchestration","BEHLR"),e("5191","Video Conferencing Platforms","KONFE"),
  e("5191","Online Education Platforms","KURSN"),e("5191","Digital Publishing Platforms","VERLG"),e("5191","Podcast Platforms","HORSP"),
  e("5112","Identity Management Software","KENNG"),e("5112","Data Visualization","SICHTB"),e("5112","Document Management","DOKUV"),
  e("5112","Compliance Software","REGTP"),e("5121","Business Intelligence Services","ANALY"),e("5121","Data Mining Services","GRABE"),
  e("5182","Disaster Recovery Services","NOTRV"),e("5182","IaaS Providers","GRUNDL"),e("5182","PaaS Providers","PLATT"),
  e("5182","SaaS Providers","DIENW"),e("5191","Fintech Platforms","FINZP"),e("5191","Healthtech Platforms","GESTP"),
  e("5191","Proptech Platforms","IMMBP"),e("5191","Edtech Platforms","BILDP"),e("5112","CAD/CAM Software","ZEICH"),
  e("5112","GIS Software","KARTP"),e("5112","Simulation Software","NACHB"),e("5112","Embedded Systems Software","EINBT"),
  e("5171","VoIP Services","STIMP"),e("5171","IPTV Services","FERNT"),e("5172","5G Network Services","FUENF"),
  e("5172","Fixed Wireless Access","FESTF"),e("5174","Managed WiFi Services","DRAFL"),e("5174","Rural Broadband","LANDN"),
  e("5112","Cybersecurity Platforms","WACHP"),e("5112","Endpoint Protection","ENDSK"),e("5112","SIEM Platforms","UEBRW"),
  e("5112","Vulnerability Management","SCHWK"),e("5112","Data Loss Prevention","LECKV"),e("5112","Encryption Software","KRYPT"),
  e("5121","ETL and Data Pipeline","ROHRD"),e("5121","Real-Time Analytics","ECHTZ"),e("5182","Multi-Cloud Management","MEHWK"),
  e("5182","Cloud Migration Services","UMZGS"),e("5191","Digital Advertising Platforms","ANZGP"),e("5191","Review Platforms","BEWTP"),
  e("5112","Workflow Automation","ABLAU"),e("5112","Natural Language Processing","SPRCH"),e("5112","Computer Vision Software","SEHPR"),
  e("5112","Digital Twin Software","DOPPK"),e("5121","Synthetic Data Generation","KUDAT"),e("5182","GPU Cloud Services","GRAFR"),
  e("5191","Creator Economy Platforms","SCHPF"),e("5191","Gig Economy Platforms","AUFTR"),e("5172","IoT Connectivity","DINGV"),
  e("5174","Mesh Network Providers","GFLCH"),e("5112","Open Source Support","FREIS"),e("5112","Database Administration Tools","DBWRK"),
  e("5182","Bare Metal Cloud","REINM"),e("5191","Professional Network Platforms","BERUP"),e("5112","MLOps Platforms","MLOPK"),
  e("5112","Observability Platforms","BLCKP"),e("5121","Data Governance Services","DRGVN"),e("5182","Confidential Computing","GEHMR"),
  e("5191","B2B Marketplace Platforms","FIRMM"),e("5191","Government Tech Platforms","VERWP"),
  e("5112","Supply Chain Software","KEDJP"),e("5112","Healthcare IT Software","SJKVP"),e("5182","Disaster Recovery as a Service","ATRSP"),
  e("5191","Legal Tech Platforms","JURIDP"),e("5112","FinTech Software","FINNSP"),e("5172","Private 5G Networks","FEMGP"),
  e("5112","Construction Tech Software","BYGTP"),
];

// ─── RETAIL (120) — Root: HAMN (harbor/market) ──────────────────────────
const RETAIL_SUBS: SubEntry[] = [
  e("4411","Automobile Dealers","BILHA"),e("4411","New Car Dealers","NYBIL"),e("4411","Used Car Dealers","BRKTV"),
  e("4412","Other Motor Vehicle Dealers","ANDRF"),e("4412","Recreational Vehicle Dealers","FRITI"),e("4412","Motorcycle Dealers","KVLRN"),
  e("4413","Auto Parts and Tire Stores","DELAR"),e("4413","Tire Dealers","RINGV"),e("4421","Furniture Stores","MOBLE"),
  e("4421","Outdoor Furniture Stores","UTEMB"),e("4422","Home Furnishings Stores","HEMVR"),e("4422","Floor Covering Stores","GOLVH"),
  e("4422","Window Treatment Stores","GARDN"),e("4431","Electronics and Appliance Stores","TEKNI"),e("4431","Computer and Software Stores","DATOR"),
  e("4431","Camera and Photography Stores","FOTOH"),e("4441","Building Material Dealers","BYGGV"),e("4441","Home Centers","HEMCN"),
  e("4441","Hardware Stores","JARNH"),e("4442","Lawn and Garden Stores","TRADG"),e("4442","Nursery and Garden Centers","PLNTH"),
  e("4451","Grocery Stores","MATVA"),e("4451","Supermarkets","STORL"),e("4451","Specialty Food Stores","DELIK"),
  e("4452","Meat Markets","KOTTV"),e("4452","Fish and Seafood Markets","FISKH"),e("4452","Fruit and Vegetable Markets","GRONT"),
  e("4453","Beer, Wine, and Liquor Stores","VINBU"),e("4461","Health and Personal Care Stores","HALSO"),e("4461","Pharmacies","APOTN"),
  e("4461","Cosmetics and Beauty Stores","SKONH"),e("4461","Optical Goods Stores","GLASB"),e("4471","Gasoline Stations","BENSI"),
  e("4471","Convenience Stores with Gas","KIOSK"),e("4481","Clothing Stores","KLADH"),e("4481","Men's Clothing Stores","HERRM"),
  e("4481","Women's Clothing Stores","DAMKL"),e("4481","Children's Clothing Stores","BARNK"),e("4482","Shoe Stores","SKOBU"),
  e("4483","Jewelry Stores","GULDS"),e("4483","Watch Stores","URMAK"),e("4491","Sporting Goods Stores","SPORH"),
  e("4491","Hobby and Toy Stores","LEKVR"),e("4491","Musical Instrument Stores","MUSVR"),e("4492","Book Stores","BOKHA"),
  e("4492","News Dealers","TIDNG"),e("4511","Department Stores","VARUH"),e("4511","Discount Department Stores","PRISL"),
  e("4521","General Merchandise Stores","ALLVR"),e("4521","Dollar Stores","ENKVR"),e("4521","Warehouse Clubs","LAGKL"),
  e("4529","Other General Merchandise","BLAND"),e("4531","Florists","BLOMH"),e("4532","Office Supplies and Stationery","KONTR"),
  e("4532","Gift and Novelty Stores","GAVOB"),e("4533","Used Merchandise Stores","ANTIK"),e("4533","Thrift Stores","BRUKV"),
  e("4539","Other Miscellaneous Retail","OVRIG"),e("4541","Electronic Shopping","NATHA"),e("4541","Mail-Order Houses","POSTK"),
  e("4542","Vending Machine Operators","AUTOM"),e("4543","Direct Selling Establishments","DIRKT"),e("4411","Luxury Auto Dealers","LXBIL"),
  e("4411","Electric Vehicle Dealers","ELBIL"),e("4412","Boat Dealers","BATHA"),e("4413","Auto Accessories Stores","EXTRV"),
  e("4421","Mattress Stores","SANGH"),e("4422","Kitchen and Bath Stores","KOKBH"),e("4431","Appliance Only Stores","VITVA"),
  e("4431","Smart Home Stores","SMHEM"),e("4441","Paint Stores","FARGB"),e("4441","Lumber Yards","TRAVE"),
  e("4442","Outdoor Power Equipment","MASKH"),e("4451","Organic Grocery Stores","EKOMA"),e("4451","Ethnic Grocery Stores","INVRD"),
  e("4452","Bakery Stores","BAGVR"),e("4452","Deli Stores","CHARV"),e("4453","Craft Beer Stores","BRYGH"),
  e("4461","Vitamin and Supplement Stores","NAHRT"),e("4461","Medical Supply Stores","HJLPM"),e("4471","Truck Stop Plazas","STOPH"),
  e("4481","Boutique Clothing Stores","BUTIK"),e("4481","Athletic Clothing Stores","AKTIV"),e("4482","Athletic Shoe Stores","LOPAR"),
  e("4483","Fine Jewelry Stores","EDELH"),e("4491","Outdoor Recreation Stores","FRIHA"),e("4491","Fishing and Hunting Stores","JAGDH"),
  e("4492","Comic Book Stores","SERIN"),e("4511","Luxury Department Stores","LYXVR"),e("4521","Variety Stores","SORTM"),
  e("4529","Farm Supply Stores","LANTV"),e("4531","Garden Supply Stores","ODLNG"),e("4532","Art Supply Stores","KONST"),
  e("4533","Consignment Stores","INLAM"),e("4539","Pet Stores","DJURF"),e("4539","Smoke and Vape Stores","ANGSB"),
  e("4541","Subscription Box Services","PRENB"),e("4541","Flash Sale Platforms","BLIXT"),e("4543","Party Plan Selling","FESTH"),
  e("4543","Network Marketing Retail","NTVRD"),e("4411","Commercial Vehicle Dealers","FIRMB"),e("4422","Lighting Stores","LJUSH"),
  e("4431","Cell Phone Stores","TELEH"),e("4441","Plumbing Supply Stores","RORVA"),e("4451","Natural Foods Stores","RENVR"),
  e("4461","Hearing Aid Stores","HORBH"),e("4481","Bridal Stores","BRUDS"),e("4491","Bike Stores","CYKLH"),
  e("4492","Educational Supply Stores","SKOLV"),e("4532","Party Supply Stores","KALVR"),e("4539","Tobacco Stores","TOBKH"),
  e("4541","Auction Platforms","BUDRP"),e("4543","Door-to-Door Sales","DORRS"),
  e("4411","Electric Vehicle Dealers","ELBIH"),e("4441","Building Material Stores","BYGMV"),e("4451","Ethnic Grocery Stores","ETNMH"),
  e("4461","Optical Goods Stores","OPTKVR"),e("4481","Athletic Shoe Stores","SPRTH"),e("4529","Discount Stores","RABTH"),
  e("4539","Cannabis Dispensaries","HAMPB"),
];

// ─── TRANSPORTATION (120) — Root: WAGEN ──────────────────────────────────
const TRANSPORTATION_SUBS: SubEntry[] = [
  e("4811","Scheduled Air Transportation","FLYGR"),e("4812","Nonscheduled Air Transportation","CHART"),e("4812","Air Ambulance Services","LUFTR"),
  e("4812","Air Charter Services","PRIVF"),e("4821","Rail Transportation","TOGBA"),e("4821","Freight Rail","GODST"),
  e("4821","Passenger Rail","RESND"),e("4821","Commuter Rail","PENDL"),e("4831","Deep Sea Transportation","HAVSR"),
  e("4831","Deep Sea Freight","FRAKD"),e("4831","Deep Sea Passenger","LINJS"),e("4832","Inland Water Transportation","FLODV"),
  e("4832","Barge Transportation","PRAMV"),e("4832","Great Lakes Shipping","SJOFR"),e("4841","General Freight Trucking","LASTV"),
  e("4841","Long-Distance Truckload","FJRLT"),e("4841","Short-Distance Trucking","NARLV"),e("4842","Specialized Freight Trucking","SARTL"),
  e("4842","Refrigerated Trucking","KYLTR"),e("4842","Tanker Trucking","TANKV"),e("4842","Flatbed Trucking","FLAKV"),
  e("4842","Moving Services","FLYTT"),e("4851","Urban Transit Systems","STADS"),e("4851","Bus Transit","BUSSD"),
  e("4851","Light Rail Transit","SPRVG"),e("4851","Subway Systems","TUNLB"),e("4852","Interurban Bus Transportation","MELLB"),
  e("4853","Taxi and Limousine Service","TAXID"),e("4853","Ride-Hailing Services","APPKR"),e("4854","School and Employee Bus","SKOLB"),
  e("4855","Charter Bus Industry","TURBS"),e("4859","Other Transit and Ground Passenger","ANDRR"),e("4859","Shuttle Services","PENDV"),
  e("4859","Paratransit Services","SARRV"),e("4861","Pipeline Transportation of Crude Oil","OLJEL"),e("4862","Pipeline Transportation of Natural Gas","GASLD"),
  e("4869","Other Pipeline Transportation","ROHRL"),e("4871","Scenic and Sightseeing, Land","TURLV"),e("4872","Scenic and Sightseeing, Water","BATUT"),
  e("4879","Scenic and Sightseeing, Other","LUFTB"),e("4881","Support Activities for Air Transportation","FLYGS"),e("4881","Airport Operations","TERMN"),
  e("4881","Air Traffic Control","RADRS"),e("4882","Support Activities for Rail Transportation","BANGD"),e("4883","Support Activities for Water Transportation","HAMNS"),
  e("4883","Port Operations","KAJPN"),e("4883","Marine Cargo Handling","STUVR"),e("4884","Support Activities for Road Transportation","VAGVR"),
  e("4884","Toll Road Operations","AVGFT"),e("4884","Bridge and Tunnel Operations","PASHG"),e("4885","Freight Transportation Arrangement","SPEDI"),
  e("4885","Customs Brokerage","TULLV"),e("4885","Freight Forwarding","SANDE"),e("4889","Other Support Activities","OVRIG"),
  e("4911","Postal Service","POSTV"),e("4921","Couriers and Express Delivery","KURRI"),e("4922","Local Messengers","BUDSV"),
  e("4931","Warehousing and Storage","LAGVR"),e("4931","General Warehousing","ALLML"),e("4931","Refrigerated Warehousing","KYLLG"),
  e("4931","Farm Product Warehousing","SILOV"),e("4931","Hazmat Warehousing","FARLT"),e("4931","Bonded Warehousing","TULLG"),
  e("4811","Cargo Air Services","FRGFL"),e("4811","Regional Air Carriers","KORTF"),e("4821","High-Speed Rail","SNABB"),
  e("4831","Container Shipping","CONTN"),e("4831","Bulk Carrier Shipping","BULKF"),e("4841","Less-Than-Truckload","SAMLA"),
  e("4842","Oversized Load Transport","STORV"),e("4842","Auto Transport","BILTR"),e("4851","Bus Rapid Transit","SNBSS"),
  e("4853","Black Car Services","SVRTX"),e("4859","Medical Transportation","SJUKR"),e("4881","Ground Handling Services","MARKB"),
  e("4882","Railroad Switching","VAXLR"),e("4883","Tugboat Services","BOGSR"),e("4884","Truck Stop Services","RASTV"),
  e("4885","Third-Party Logistics","TRDJL"),e("4921","Same-Day Delivery","DAGBV"),e("4931","Distribution Centers","DISTR"),
  e("4931","E-Commerce Fulfillment","UPPFV"),e("4931","Cold Chain Logistics","KYLKD"),e("4931","Document Storage","ARKIV"),
  e("4811","Air Mail Services","LUFTP"),e("4842","Household Goods Moving","HEMFL"),e("4885","Supply Chain Management Services","FORSJ"),
  e("4931","Self-Storage Facilities","FACKL"),
  e("4811","Drone Delivery Services","DRNFL"),e("4812","Medical Air Transport","SJKFL"),e("4821","Intermodal Rail","KOMLR"),
  e("4821","Rail Maintenance Services","BNDRP"),e("4831","Roll-On Roll-Off Shipping","ROROF"),e("4831","LNG Carrier Shipping","GASFR"),
  e("4832","Ferry Services","FARJV"),e("4832","River Cruise Services","ALVKR"),e("4841","Drayage Services","HAMTV"),
  e("4841","Expedited Freight","SNBFR"),e("4842","Car Carrier Transport","BILBR"),e("4842","Livestock Transport","DJRTV"),
  e("4851","Monorail Systems","ENSPV"),e("4851","Trolleybus Systems","TRLLB"),e("4853","Airport Taxi Services","FLYGT"),
  e("4854","Corporate Shuttle Services","FRMAB"),e("4859","Pedicab Services","CYKLV"),e("4859","Water Taxi Services","VATNT"),
  e("4861","Refined Product Pipelines","RAFLD"),e("4869","Carbon Dioxide Pipelines","KOLRL"),e("4871","Heritage Railway Tourism","ANGTR"),
  e("4872","Whale Watching Tours","VALTR"),e("4881","Aircraft Fueling Services","TANKFL"),e("4881","De-Icing Services","ISNFL"),
  e("4882","Rail Yard Operations","BANGRD"),e("4883","Ship Chandler Services","SKEPB"),e("4884","Weigh Station Operations","VAGST"),
  e("4885","Intermodal Marketing Companies","IMDKV"),e("4921","Last-Mile Delivery Services","SISTM"),e("4922","Bicycle Courier Services","CYKBV"),
  e("4931","Cross-Dock Facilities","OMLST"),e("4931","Bulk Storage Terminals","BULKL"),
];

// ─── EDUCATION (120) — Root: ADOHI ──────────────────────────────────────
const EDUCATION_SUBS: SubEntry[] = [
  e("6111","Elementary and Secondary Schools","GRUNDL"),e("6111","Public Elementary Schools","FOLKSK"),e("6111","Public High Schools","GYMNASR"),
  e("6111","Private Elementary Schools","PRIVGR"),e("6111","Private High Schools","PRIVGY"),e("6111","Charter Schools","FRIGRS"),
  e("6111","Magnet Schools","SARSKL"),e("6111","Montessori Schools","MONTES"),e("6111","Waldorf Schools","STEINE"),
  e("6111","International Schools","INTERSK"),e("6112","Junior Colleges","HOGSKS"),e("6112","Community Colleges","SAMHSK"),
  e("6112","Technical Colleges","TEKNSK"),e("6113","Colleges and Universities","UNIVRST"),e("6113","Public Universities","STATUN"),
  e("6113","Private Universities","PRIVUN"),e("6113","Research Universities","FORSKUN"),e("6113","Liberal Arts Colleges","FRIKON"),
  e("6113","Historically Black Colleges","HISTSK"),e("6113","Tribal Colleges","STAMMSK"),e("6114","Business Schools","HANDSK"),
  e("6114","Computer Training","DATORK"),e("6114","Management Training","LEDARSK"),e("6114","Professional Development","FORTBL"),
  e("6115","Technical and Trade Schools","YRKESSK"),e("6115","Cosmetology Schools","SKONSK"),e("6115","Flight Training","FLYGSK"),
  e("6115","Truck Driving Schools","KORSKL"),e("6115","Apprenticeship Training","LARLIN"),e("6116","Other Schools and Instruction","OVRIGSK"),
  e("6116","Fine Arts Schools","KONSSK"),e("6116","Music Schools","MUSIKSK"),e("6116","Dance Schools","DANSSK"),
  e("6116","Athletic Instruction","IDRTSK"),e("6116","Language Schools","SPRAKSK"),e("6116","Exam Preparation","PROVFB"),
  e("6117","Educational Support Services","STODJN"),e("6117","Curriculum Development","LARPLNR"),e("6117","Educational Testing","TESTNI"),
  e("6117","Student Counseling","VAGLED"),e("6117","Educational Consulting","RADGVN"),e("6117","Special Education Support","SARSTP"),
  e("6111","Virtual Schools","DISTSK"),e("6111","Military Schools","KADETT"),e("6111","Religious Schools","KONFSK"),
  e("6111","Boarding Schools","INTERNT"),e("6111","Alternative Schools","ALTRSK"),e("6111","Gifted Programs","BEGVSK"),
  e("6112","Vocational Junior Colleges","YRKJC"),e("6112","Online Community Colleges","NATKRS"),e("6113","Medical Schools","LAKRSK"),
  e("6113","Law Schools","JURIST"),e("6113","Engineering Schools","TEKNHG"),e("6113","Business Schools, Graduate","MBASSK"),
  e("6113","Divinity Schools","TEOLSK"),e("6113","Art Schools, Graduate","KONSTH"),e("6113","Music Conservatories","KONSRV"),
  e("6113","Agriculture Colleges","JORDSK"),e("6113","Pharmacy Schools","APOTSK"),e("6113","Nursing Schools","SJUKSK"),
  e("6113","Dental Schools","TANDSK"),e("6113","Veterinary Schools","VETERSK"),e("6114","IT Certification Training","CERTSK"),
  e("6114","Project Management Training","PROJSK"),e("6114","Sales Training","FORSSK"),e("6114","Leadership Training","LEDRSK"),
  e("6114","Healthcare Training","HLSOSK"),e("6115","Welding Schools","SVTSKL"),e("6115","Electrician Training","ELKRSK"),
  e("6115","Plumbing Training","RORSKL"),e("6115","HVAC Training","KLIMSK"),e("6115","Culinary Schools","KOKSK"),
  e("6115","Automotive Technology","BILSKL"),e("6115","Dental Hygiene Training","TANDHG"),e("6115","Medical Assistant Training","MEDASSK"),
  e("6115","Phlebotomy Training","BLODSK"),e("6115","EMT and Paramedic Training","AKUTSK"),e("6116","Swimming Schools","SIMSKL"),
  e("6116","Martial Arts Schools","KAMPSK"),e("6116","Yoga and Pilates Instruction","YOGASK"),e("6116","Tutoring Centers","PRIVLR"),
  e("6116","STEM Programs","NATURSK"),e("6116","Coding Bootcamps","KODSKL"),e("6116","Photography Schools","FOTOSKL"),
  e("6116","Drama Schools","TETRSK"),e("6116","Driving Schools","KORSKS"),e("6117","Library Services","BIBLSK"),
  e("6117","Textbook Publishing","LARBOK"),e("6117","Assessment Services","BEDMSK"),e("6117","School Administration Services","SKOLAD"),
  e("6117","Student Transportation Services","SKOLVG"),e("6117","School Food Services","MATSKL"),e("6117","Student Health Services","SKOLHL"),
  e("6117","After-School Programs","FRTIDSK"),e("6117","Study Abroad Programs","UTBYTSK"),e("6117","Scholarship Administration","STIPSK"),
  e("6117","School Safety Services","TRYGGSK"),e("6111","Homeschool Support","HEMSKL"),e("6112","Dual Enrollment Programs","DUBSKL"),
  e("6113","Online Universities","NATUNIV"),e("6114","Continuing Education","FORTUTB"),e("6115","Real Estate Training","IMMBSK"),
  e("6116","Outdoor Education","FRILSK"),e("6117","EdTech Support Services","TEKPEDSK"),e("6117","Accreditation Services","ACKRESK"),
  e("6111","STEM Academies","VETENASK"),e("6111","Performing Arts Schools","SCENKSK"),e("6113","Graduate Research Institutes","FORSINST"),
  e("6114","Corporate Training","FIRMASKL"),e("6115","Maritime Training","SJOSKL"),e("6116","Early Childhood Education Centers","SMBRNSK"),
  e("6117","Disability Services","FUNKSKL"),e("6117","Career Services","KARRISK"),e("6113","Seminary Schools","PRSTSKL"),
  e("6115","Construction Training","BYGGSKL"),e("6116","Adult Literacy Programs","LASSKL"),
  e("6111","Classical Academies","KLASSK"),e("6113","Osteopathic Medical Schools","OSTMSK"),e("6115","Cybersecurity Training","CYBSKL"),
  e("6116","Robotics Programs","ROBSKL"),
];

// ─── GOVERNMENT (120) — Root: TINGS ────────────────────────────────────
const GOVERNMENT_SUBS: SubEntry[] = [
  e("9211","Executive Offices","KANSL"),e("9211","Federal Executive","BUNDE"),e("9211","State Executive","STATE"),
  e("9211","Municipal Executive","KOMME"),e("9211","County Executive","KREISE"),e("9211","Tribal Government","STAMV"),
  e("9211","Military Executive","KRGSL"),e("9221","Courts","DOMST"),e("9221","Federal Courts","BNDMR"),
  e("9221","State Courts","LANDR"),e("9221","Municipal Courts","KOMDR"),e("9221","Administrative Law Courts","FORVR"),
  e("9222","Police Protection","POLSK"),e("9222","Federal Law Enforcement","BNDPL"),e("9222","State Police","LANPL"),
  e("9222","Municipal Police","KOMPL"),e("9222","Sheriff Departments","FOGDE"),e("9222","Corrections","FANGV"),
  e("9222","Federal Prisons","BNDFA"),e("9222","State Prisons","LANFA"),e("9222","Juvenile Detention","UNGDF"),
  e("9222","Probation Services","VILLK"),e("9223","Fire Protection","BRANDV"),e("9223","Municipal Fire Departments","KOMLD"),
  e("9223","Volunteer Fire Companies","FRIBY"),e("9223","Wildfire Services","SKOGB"),e("9223","Emergency Medical Services","AKUTV"),
  e("9231","Legislative Bodies","RIKSD"),e("9231","Federal Legislature","BNDLG"),e("9231","State Legislature","LANLG"),
  e("9231","City Councils","KOMRD"),e("9231","County Boards","KRSRD"),e("9241","Administration of Environmental Programs","MILJO"),
  e("9241","Air Quality Programs","LUFTV"),e("9241","Water Quality Programs","VATNV"),e("9241","Waste Management Programs","AVFLV"),
  e("9241","Land Management Programs","MARKV"),e("9251","Housing Programs","BOSTD"),e("9251","Urban Development Programs","STDUT"),
  e("9251","Community Development Programs","SAMHUT"),e("9251","Rural Development Programs","LANDUT"),e("9261","Economic Programs","NARIG"),
  e("9261","Business Development Programs","FORUT"),e("9261","Trade Programs","HANDUT"),e("9261","Tourism Programs","TURUT"),
  e("9261","Workforce Programs","ARBKUT"),e("9271","Space Research","RYMDV"),e("9271","Defense Research","FORSV"),
  e("9271","Health Research Programs","HLSOF"),e("9271","Agricultural Research Programs","JORDF"),e("9271","Energy Research Programs","ENRGV"),
  e("9281","Social Assistance Programs","SOCIA"),e("9281","Veterans Affairs","VETRNV"),e("9281","Public Health Programs","FOLKH"),
  e("9281","Disability Programs","HANDKV"),e("9281","Child Welfare Programs","BARNV"),e("9281","Aging Programs","ALDRSV"),
  e("9311","Education Administration","SKOLV"),e("9311","Higher Education Administration","HOGUT"),e("9311","K-12 Administration","GRNDUT"),
  e("9311","Special Education Administration","SARVD"),e("9411","Health Administration","SJVRD"),e("9411","Medicare Administration","SJUKFV"),
  e("9411","Medicaid Administration","BIDRGV"),e("9411","Public Health Administration","FOLKV"),e("9411","Behavioral Health Administration","PSYKV"),
  e("9511","Transportation Administration","TRAFIKV"),e("9511","Highway Administration","VAGVRD"),e("9511","Aviation Administration","FLYGVD"),
  e("9511","Maritime Administration","SJOFV"),e("9511","Transit Administration","KOLLVD"),e("9611","Tax Administration","SKATVD"),
  e("9611","Revenue Collection","UPPBRD"),e("9611","Property Assessment","TAXERV"),e("9611","Customs Administration","TULLVD"),
  e("9711","Public Safety Administration","TRYGGV"),e("9711","Homeland Security","HEMSKV"),e("9711","Emergency Management","KRISV"),
  e("9711","Border Security","GRNSVD"),e("9711","Intelligence Services","UNDRTV"),e("9211","Governor's Office","LANDSH"),
  e("9211","Mayor's Office","BORGMV"),e("9221","Appellate Courts","HOVRTV"),e("9221","Supreme Court","HOGSTV"),
  e("9222","Campus Police","UNIVPV"),e("9222","Transit Police","KOLLPV"),e("9223","Hazmat Response","FARLGT"),
  e("9231","Regulatory Commissions","NMNDVD"),e("9241","Wildlife Management","VILTVD"),e("9241","Forestry Programs","SKOVD"),
  e("9251","Zoning Administration","PLANVD"),e("9261","Export Promotion","EXPRTV"),e("9261","Small Business Programs","SMAFVD"),
  e("9271","Science Foundation Programs","VETNSV"),e("9281","Food Assistance Programs","MATBJV"),e("9281","Unemployment Programs","ARBLOV"),
  e("9311","Student Aid Administration","STUDVD"),e("9411","Drug Control Programs","NARKVD"),e("9511","Port Authority","HAMNVD"),
  e("9611","Budget Administration","BUDGVD"),e("9711","Cybersecurity Programs","DATASVD"),e("9211","Inspector General","TILLSV"),
  e("9221","Judicial Administration","DOMVRD"),e("9222","Forensic Services","TEKUTV"),e("9223","911 Operations","LARMCD"),
  e("9231","Ethics Commissions","ETIKND"),e("9241","Climate Programs","KLIMVD"),e("9251","Infrastructure Programs","INFRVD"),
  e("9261","Labor Relations","ARBRLV"),e("9271","Census Operations","FOLKRV"),e("9281","Refugee Programs","FLYKTV"),
  e("9711","Counter-Terrorism","TERRVD"),e("9211","Public Records","ARKIVVD"),e("9221","Public Defender","ALLFRV"),
  e("9222","Parole Services","UTSKVD"),e("9281","Social Insurance","FORSKV"),
  e("9211","Ombudsman Offices","OMBDV"),e("9241","Pesticide Regulation","BEKMPV"),e("9261","Minority Business Programs","MINFRV"),
  e("9711","Disaster Preparedness","BRDSKV"),
];

// ─── DEFENSE (120) — Root: WACHT ────────────────────────────────────────
const DEFENSE_SUBS: SubEntry[] = [
  e("9271","Army Operations","HEERS"),e("9271","Navy Operations","FLOTTN"),e("9271","Air Force Operations","LUFTV"),
  e("9271","Marine Corps Operations","MARINV"),e("9271","Space Force Operations","RYMDV"),e("9271","Coast Guard Operations","KUSTV"),
  e("9271","National Guard Operations","GARDV"),e("9271","Reserve Forces","RESERV"),e("9271","Special Operations","SARSKV"),
  e("9271","Cyber Command Operations","DATAVF"),e("3364","Military Aircraft Manufacturing","JAKTFL"),e("3364","Military Helicopter Manufacturing","HELIKV"),
  e("3364","Unmanned Aerial Vehicle Manufacturing","DRONVF"),e("3364","Military Satellite Manufacturing","SATVF"),e("3366","Naval Shipbuilding","KRIGVF"),
  e("3366","Submarine Manufacturing","UBATMV"),e("3369","Military Vehicle Manufacturing","PANZVF"),e("3369","Armored Personnel Carrier","SKDDVF"),
  e("3489","Ordnance and Ammunition","VAPENV"),e("3489","Small Arms Manufacturing","GEVRVF"),e("3489","Missile Manufacturing","ROBOTVF"),
  e("3489","Explosive Manufacturing","SPRNGVF"),e("3344","Military Electronics","RADRVF"),e("3344","Sonar Systems","SONARVF"),
  e("3344","Night Vision Equipment","NATTVF"),e("3344","Electronic Warfare Systems","STORVF"),e("3345","Military Navigation Systems","NAVGVF"),
  e("3345","Fire Control Systems","SIKTVF"),e("3345","Military Communication Systems","SAMNVF"),e("5415","Defense Software Development","PROGVF"),
  e("5415","Cybersecurity Defense","VARNVF"),e("5415","Intelligence Software","UNDRVF"),e("5415","Command and Control Systems","LEDSVF"),
  e("5415","Battlefield Management Systems","STRDVF"),e("5416","Defense Consulting","RAADVF"),e("5416","Military Strategy Consulting","TAKTVF"),
  e("5416","Acquisition Consulting","UPPKVF"),e("5417","Defense Research","FORSVF"),e("5417","Weapons Research","VAPFVF"),
  e("5417","Materials Research, Defense","MATVF"),e("5417","Biodefense Research","BIOVF"),e("5417","Nuclear Defense Research","KARNVF"),
  e("5617","Defense Security Services","BEVAKVF"),e("5617","Military Installation Security","BASVF"),e("5617","Personnel Security Clearance","SAKRVF"),
  e("5617","Physical Security Systems","LASMVF"),e("4881","Military Air Transport","TRSPVF"),e("4841","Defense Logistics","LOGSVF"),
  e("4931","Military Supply Chain","FORRVF"),e("4931","Ammunition Storage","AMMOVF"),e("2362","Military Construction","BYGVF"),
  e("2362","Forward Operating Base Construction","FRMBVF"),e("8111","Military Vehicle Maintenance","UNDRVF"),e("8111","Aircraft Maintenance, Military","FLYGVF"),
  e("8111","Ship Repair, Military","VARVVF"),e("6221","Military Hospitals","SJUKVF"),e("6221","Combat Medical Support","FALTLV"),
  e("6116","Military Training Programs","UTBLVF"),e("6116","Officer Training","KADTVF"),e("6116","Enlisted Training","REKRVF"),
  e("6116","Technical Military Training","TEKVF"),e("5112","Defense Simulation Software","SIMVF"),e("5112","Military Modeling Software","MODVF"),
  e("5112","Defense Intelligence Analytics","ANALVF"),e("3344","Radar Systems Manufacturing","EKOBVF"),e("3344","Communications Encryption","KRYPVF"),
  e("3345","Drone Control Systems","FJRVF"),e("3345","Guided Munition Systems","STYRVF"),e("3364","Space Launch Vehicles","RAKTVF"),
  e("3364","Military Transport Aircraft","HRKFVF"),e("3366","Amphibious Vessel Manufacturing","AMFVF"),e("3369","Military Trailer Manufacturing","SLPVF"),
  e("5415","Signals Intelligence Software","SIGVF"),e("5415","Geospatial Intelligence","GEOVF"),e("5416","Defense Acquisition Support","ANSKV"),
  e("5416","Cost Estimation, Defense","KALKV"),e("5417","Directed Energy Research","LASVF"),e("5417","Hypersonic Research","HYPVF"),
  e("5617","Counter-Intelligence Services","MOTSVF"),e("5617","Security Assessment","GRANVF"),e("2362","Hardened Facility Construction","BUNKVF"),
  e("2371","Military Infrastructure","INFRVF"),e("4931","Defense Warehousing","LAGRVF"),e("4881","Military Port Operations","HAMNVF"),
  e("3391","Military Medical Devices","MILVF"),e("3391","Body Armor Manufacturing","SKYDVF"),e("3391","Chemical Protection Equipment","KEMSVF"),
  e("6116","War College Programs","HOGMVF"),e("6116","Language Training, Military","SPRKVF"),e("5112","Autonomous Systems Software","AUTVF"),
  e("5112","Space Situational Awareness","RYMOVF"),e("3344","Infrared Systems","IRVF"),e("3345","Inertial Navigation Systems","TRGVF"),
  e("5415","Logistics Software, Military","LOGPVF"),e("5417","Counter-IED Research","IODVF"),e("5617","Base Operations Support","DRIFVF"),
  e("3364","Rotorcraft Manufacturing","ROTVF"),e("3489","Propellant Manufacturing","DRIVVF"),e("3344","Electro-Optical Systems","OPTVF"),
  e("5415","Mission Planning Software","PLANVF"),e("5416","Test and Evaluation Services","TESTVF"),e("3369","Landing Craft Manufacturing","LANVF"),
  e("5415","Electronic Health Records, Military","JOURNVF"),e("5617","Military Police Services","MPOLV"),
  e("3345","Satellite Ground Systems","JORDVF"),e("5416","Program Management, Defense","PROGMVF"),
  e("5417","Artificial Intelligence, Defense","AIVF"),e("3344","Quantum Sensing, Defense","KVNTVF"),
  e("9271","Cyber Command Operations","CYBKVF"),e("3344","Night Vision Systems","NKTVF"),e("3345","Sonar Systems Manufacturing","SONRVF"),
  e("5415","Battlefield Management Software","SLAGVF"),e("5417","Biodefense Research","BIORVF"),e("3364","Unmanned Aerial Vehicles","UAVVF"),
  e("3366","Submarine Manufacturing","UBTVF"),e("5617","Military Housing Services","BOHSVF"),e("3391","Field Medical Equipment","FALTVF"),
  e("5112","Cyber Warfare Software","DIGKVF"),e("3489","Ordnance Manufacturing","AMNVF"),e("5416","Threat Assessment Services","HOTVF"),
];

// ─── REAL_ESTATE (105) — Root: GRUND ─────────────────────────────────────
const REAL_ESTATE_SUBS: SubEntry[] = [
  e("5311","Lessors of Real Estate","HYRES"),e("5311","Residential Lessors","BOSTR"),e("5311","Commercial Lessors","KONTR"),
  e("5311","Industrial Lessors","FABHR"),e("5311","Retail Space Lessors","BUTHR"),e("5311","Office Space Lessors","KONHR"),
  e("5311","Self-Storage Lessors","FORVL"),e("5312","Real Estate Agents and Brokers","MAKLR"),e("5312","Residential Brokers","BOSMK"),
  e("5312","Commercial Brokers","KOMMK"),e("5312","Industrial Brokers","INDMK"),e("5312","Land Brokers","MARKMK"),
  e("5313","Activities Related to Real Estate","TJNST"),e("5313","Property Management","FORVT"),e("5313","Residential Property Management","BOSFF"),
  e("5313","Commercial Property Management","KOMFF"),e("5313","HOA Management","FORMG"),e("5313","Real Estate Appraisal","VARDR"),
  e("5313","Real Estate Consulting","RADGR"),e("5311","Multi-Family Residential","FLRBR"),e("5311","Single-Family Rental","ENFHR"),
  e("5311","Student Housing","STUDB"),e("5311","Senior Housing","ALDHR"),e("5311","Affordable Housing","BILIB"),
  e("5311","Medical Office Lessors","LAKHR"),e("5311","Data Center Lessors","DATHR"),e("5311","Coworking Space Lessors","SAMHR"),
  e("5311","Warehouse Lessors","LAGHR"),e("5311","Agricultural Land Lessors","JORHR"),e("5311","Recreational Land Lessors","FRITHR"),
  e("5312","Buyer's Agents","KOPAG"),e("5312","Listing Agents","SLJAG"),e("5312","Luxury Real Estate Agents","LYXAG"),
  e("5312","Farm and Ranch Brokers","GARDMK"),e("5312","Auction Companies","AUKTN"),e("5313","Property Tax Consulting","SKTRD"),
  e("5313","Relocation Services","FLYRD"),e("5313","Tenant Representation","HYRRD"),e("5313","Facilities Management","DRFTV"),
  e("5313","Building Inspection Services","BESPK"),e("5313","Environmental Assessment","MILJB"),e("5259","REITs, Residential","BORB"),
  e("5259","REITs, Commercial","BORKM"),e("5259","REITs, Healthcare","BORHL"),e("5259","REITs, Industrial","BORIN"),
  e("5259","REITs, Retail","BORBT"),e("5259","REITs, Office","BORKN"),e("5259","REITs, Hospitality","BORHT"),
  e("5259","REITs, Infrastructure","BORFR"),e("5259","REITs, Data Center","BORDT"),e("5259","REITs, Self-Storage","BORFO"),
  e("5259","REITs, Timber","BORSK"),e("5311","Vacation Rental Management","SEMHR"),e("5311","Short-Term Rental Platforms","KRTHR"),
  e("5311","Mobile Home Park Lessors","VGNHR"),e("5311","Parking Lot Lessors","PARKHR"),e("5311","Billboard and Sign Lessors","SKYHR"),
  e("5312","Real Estate Auctioneers","BUDMK"),e("5312","International Real Estate Brokers","UTLMK"),e("5313","Construction Management","BYGGLD"),
  e("5313","Asset Management, Real Estate","TILLVR"),e("5313","Real Estate Development","UTVCK"),e("5313","Urban Planning Consulting","STDPL"),
  e("5313","Zoning Consulting","DETPL"),e("5313","Real Estate Marketing","MARKFR"),e("5313","Title and Escrow Services","LAGFR"),
  e("5313","Land Use Consulting","MRKVR"),e("5313","Real Estate Technology","PROPT"),e("5311","Mixed-Use Property Lessors","BLANHR"),
  e("5311","Healthcare Facility Lessors","HLSHR"),e("5311","Government Facility Lessors","MYNDHR"),e("5311","Life Sciences Facility Lessors","BIOHR"),
  e("5312","Property Exchange Intermediaries","BYTMK"),e("5313","Lease Administration","AVTHRD"),e("5313","Sustainability Consulting, RE","GRONRD"),
  e("5313","Real Estate Investment Advisory","INVRD"),e("5313","Loan Administration, Real Estate","LANADM"),e("5311","Cold Storage Facility Lessors","KYLHR"),
  e("5311","Airport Hangar Lessors","FLGHR"),e("5312","Mortgage Brokers","HYPBR"),e("5313","Condominium Conversion","BRHRD"),
  e("5313","Historic Preservation Consulting","HISTRD"),e("5259","REITs, Specialty","BORSPC"),
  e("5311","Transit-Oriented Development Lessors","KOLHR"),e("5313","1031 Exchange Facilitation","BYTFAC"),
  e("5311","Flex Space Lessors","FLEXHR"),e("5311","Lab Space Lessors","LABBHR"),e("5311","Film Studio Lessors","STDIHR"),
  e("5311","Event Venue Lessors","EVNTHR"),e("5311","Church Property Lessors","KYRKHR"),e("5312","REO Agents","REOAGR"),
  e("5312","Lease-Up Specialists","STRTMK"),e("5312","Investment Property Brokers","KAPIMK"),e("5313","Amenity Management","TRVLRD"),
  e("5313","Property Condition Assessments","TLLSTRD"),e("5313","Space Planning","RUMSPL"),e("5313","Landlord Representation","AGRDRD"),
  e("5259","REITs, Mortgage","BORHYP"),e("5259","REITs, Diversified","BORMNG"),e("5313","Move-In Move-Out Inspections","INFLRD"),
  e("5311","Incubator Space Lessors","INKBHR"),e("5312","Short Sale Specialists","SNBBMK"),e("5313","Energy Audits, Real Estate","ENRGRD"),
  e("5313","ADA Compliance Consulting, RE","ADAKRD"),e("5311","Rooftop Lease Management","TAKUHR"),
];

// ─── UTILITIES (105) — Root: STROM ───────────────────────────────────────
const UTILITIES_SUBS: SubEntry[] = [
  e("2211","Electric Power Generation","ELVKR"),e("2211","Hydroelectric Power","VATNK"),e("2211","Fossil Fuel Power","KOLKR"),
  e("2211","Nuclear Power","KARNK"),e("2211","Solar Power Generation","SOLKR"),e("2211","Wind Power Generation","VINDKR"),
  e("2211","Geothermal Power","JORDVR"),e("2211","Biomass Power Generation","BIOKR"),e("2211","Tidal Power Generation","TIDVKR"),
  e("2212","Electric Power Distribution","NATVE"),e("2212","Transmission Grid Operations","LEDNT"),e("2212","Retail Electric Providers","ELHAN"),
  e("2212","Rural Electric Cooperatives","LNDEL"),e("2212","Municipal Electric Utilities","KOMEL"),e("2213","Natural Gas Distribution","GASUT"),
  e("2213","Local Gas Distribution","LOKGS"),e("2213","Natural Gas Marketing","GASHD"),e("2213","Gas Pipeline Operations","GASLD"),
  e("2213","Propane Distribution","PROPN"),e("2221","Water Supply Systems","VATNF"),e("2221","Municipal Water Systems","KOMVT"),
  e("2221","Water Treatment Facilities","RENVT"),e("2221","Desalination Facilities","AVSLT"),e("2221","Well Water Systems","BRUNV"),
  e("2222","Sewage Treatment Facilities","AVLOP"),e("2222","Wastewater Collection","KLOAKV"),e("2222","Industrial Wastewater Treatment","INDAV"),
  e("2222","Stormwater Management","DAGNV"),e("2211","Combined Heat and Power","KRAFV"),e("2211","Distributed Generation","LOKEL"),
  e("2211","Battery Storage Systems","ACKML"),e("2211","Pumped Hydro Storage","PUMPS"),e("2212","Smart Grid Operations","SMRTN"),
  e("2212","Microgrid Systems","MIKRN"),e("2212","Grid Reliability Services","STABN"),e("2212","Demand Response Programs","STYVR"),
  e("2213","Compressed Natural Gas","TRKGS"),e("2213","Liquefied Natural Gas","FLYTGS"),e("2213","Renewable Natural Gas","BIOGS"),
  e("2221","Bulk Water Supply","STRVT"),e("2221","Irrigation Water Districts","BEVTD"),e("2221","Reclaimed Water Systems","ATRVT"),
  e("2222","Biosolids Management","SLAMV"),e("2222","Septic System Services","SEPTV"),e("2222","Combined Sewer Systems","KOMSV"),
  e("2211","Waste-to-Energy Facilities","AVFLE"),e("2211","Hydrogen Production","VATGS"),e("2211","Fuel Cell Power","CELKR"),
  e("2212","Energy Trading","ELHAN"),e("2212","Power Purchase Agreements","AVTLE"),e("2212","Net Metering Administration","MATNT"),
  e("2213","District Heating","FJRVR"),e("2213","District Cooling","FJRKL"),e("2213","Steam Distribution","ANGVR"),
  e("2221","Water Quality Monitoring","VATNK"),e("2221","Leak Detection Services","LACKA"),e("2221","Water Meter Services","MATVT"),
  e("2222","Grease Trap Services","FETTV"),e("2222","Effluent Monitoring","UTSLA"),e("2211","Offshore Wind Power","HAVVD"),
  e("2211","Community Solar Programs","SAMSOL"),e("2211","Rooftop Solar Programs","TAKSOL"),e("2212","Electric Vehicle Charging Networks","LADDNT"),
  e("2212","Virtual Power Plants","VIRTKR"),e("2212","Frequency Regulation","FREKVR"),e("2213","Gas Storage Facilities","GASLG"),
  e("2213","Gas Metering Services","GASMT"),e("2221","Fluoridation Programs","FLORV"),e("2221","Emergency Water Supply","AKUTVT"),
  e("2222","PFAS Treatment","KEMREN"),e("2222","Nutrient Removal Systems","NARFJ"),e("2211","Small Modular Reactors","SMARKR"),
  e("2211","Concentrated Solar Power","KONCSL"),e("2212","Interconnection Services","ANSLNT"),e("2213","Biogas Upgrading","RAFGS"),
  e("2221","Aquifer Storage and Recovery","GRUNDVT"),e("2222","Decentralized Wastewater","LOKAVL"),e("2211","Peaker Plants","TOPKR"),
  e("2212","Wholesale Energy Markets","GROSSM"),e("2213","CNG Fueling Stations","TANKGS"),e("2221","Dam Safety Programs","DAMSAK"),
  e("2222","Pretreatment Programs","FORFLT"),e("2211","Landfill Gas Recovery","DEPGVR"),e("2212","Load Management Programs","LASTVR"),
  e("2221","Cross-Connection Control","KORSKT"),e("2222","Inflow and Infiltration Control","INFLKT"),
  e("2211","Wave Energy Generation","VAGKR"),e("2211","Flywheel Energy Storage","SVHKR"),e("2212","Transformer Stations","TRAFST"),
  e("2212","Substation Operations","UNDSTV"),e("2213","Hydrogen Distribution","VATGSD"),e("2213","Ammonia Energy Distribution","AMNKSD"),
  e("2221","Stormwater Harvesting","RGNVT"),e("2221","Water Reuse Programs","ATRVVT"),e("2222","Membrane Bioreactors","MEMBVT"),
  e("2222","Constructed Wetland Treatment","VATLVT"),e("2211","Agrivoltaic Systems","AGRVKR"),e("2211","Floating Solar Arrays","FLTSOL"),
  e("2212","Battery Swapping Stations","BYTLAD"),e("2213","Renewable Hydrogen","GRNVTG"),e("2221","Smart Water Meters","SMRTVT"),
  e("2222","Digester Gas Recovery","ROTGVR"),e("2211","Long Duration Storage","LANGKR"),e("2212","Grid-Scale Battery Parks","BTRPKR"),
  e("2221","Atmospheric Water Generation","LUFTVT"),
];

// ─── AGRICULTURE (120) — Root: SELU ─────────────────────────────────────
const AGRICULTURE_SUBS: SubEntry[] = [
  e("1111","Oilseed and Grain Farming","SADEK"),e("1111","Soybean Farming","BONAN"),e("1111","Corn Farming","MAJSK"),
  e("1111","Wheat Farming","VETEL"),e("1111","Rice Farming","RISFM"),e("1112","Vegetable and Melon Farming","GRONT"),
  e("1112","Potato Farming","POTTS"),e("1112","Tomato Farming","TOMAT"),e("1113","Fruit and Tree Nut Farming","FRKTD"),
  e("1113","Apple Orchards","APPLN"),e("1113","Citrus Groves","CITRS"),e("1113","Berry Farming","BARON"),
  e("1113","Grape Vineyards","DRUVA"),e("1114","Greenhouse and Nursery Production","VAXTH"),e("1114","Floriculture Production","BLOMV"),
  e("1114","Nursery Stock Production","PLNTV"),e("1119","Other Crop Farming","GRDOR"),e("1119","Tobacco Farming","TOBKF"),
  e("1119","Cotton Farming","BOMUL"),e("1119","Sugarcane Farming","SCKRF"),e("1119","Hay Farming","HOFMG"),
  e("1121","Cattle Ranching","BOSKP"),e("1121","Beef Cattle Ranching","NOTKR"),e("1121","Dairy Cattle Farming","MJLKB"),
  e("1121","Cattle Feedlots","GODNF"),e("1122","Hog and Pig Farming","SVNGD"),e("1123","Poultry and Egg Production","HONSR"),
  e("1123","Broiler Chicken Production","KYCLK"),e("1123","Egg Production","AGGPD"),e("1123","Turkey Production","KALKN"),
  e("1124","Sheep and Goat Farming","FARFM"),e("1125","Aquaculture","FISKD"),e("1125","Finfish Farming","FINFM"),
  e("1125","Shellfish Farming","SKALFM"),e("1125","Shrimp Farming","RAKFM"),e("1129","Other Animal Production","ANDRD"),
  e("1129","Apiculture","BIFMR"),e("1129","Horse and Equine Production","HASTV"),e("1129","Fur-Bearing Animal Production","PALSD"),
  e("1131","Timber Tract Operations","SKOGB"),e("1132","Forest Nurseries","PLANTSK"),e("1133","Logging","AVVRK"),
  e("1141","Fishing","HAVFK"),e("1142","Hunting and Trapping","JAKTF"),e("1151","Support Activities for Crop Production","AGRTJ"),
  e("1151","Cotton Ginning","GINVR"),e("1151","Soil Preparation Services","PLOGN"),e("1151","Crop Harvesting","SKORD"),
  e("1151","Post-Harvest Crop Services","TORKA"),e("1152","Support Activities for Animal Production","DJRTJ"),e("1152","Livestock Breeding","AVELN"),
  e("1152","Livestock Spraying","DESINK"),e("1152","Veterinary, Livestock","VETVL"),e("1153","Support Activities for Forestry","SKGTJ"),
  e("1153","Forest Fire Suppression","SKBRD"),e("1153","Timber Cruising","SKGMN"),e("1111","Sunflower Farming","SOLRS"),
  e("1111","Canola Farming","RAPSA"),e("1111","Barley Farming","KORNA"),e("1111","Sorghum Farming","HIRSF"),
  e("1112","Lettuce Farming","SALLF"),e("1112","Onion Farming","LOKFM"),e("1112","Pepper Farming","PPRFM"),
  e("1113","Peach Farming","PERSK"),e("1113","Almond Farming","MANDL"),e("1113","Walnut Farming","VALN"),
  e("1113","Avocado Farming","AVKDO"),e("1113","Olive Farming","OLVFM"),e("1114","Mushroom Production","SVMPV"),
  e("1114","Herb Production","ORTPV"),e("1119","Hemp Farming","HAMPF"),e("1119","Peanut Farming","JORDN"),
  e("1119","Maple Syrup Production","LONNV"),e("1121","Bison Ranching","BISNR"),e("1122","Heritage Breed Farming","LANTRS"),
  e("1123","Duck Farming","ANKFM"),e("1123","Quail Farming","VAKFM"),e("1124","Alpaca Farming","ALPKF"),
  e("1124","Goat Dairy Farming","GETMJ"),e("1125","Salmon Farming","LAXFM"),e("1125","Tilapia Farming","TILPF"),
  e("1125","Oyster Farming","OSTRF"),e("1125","Catfish Farming","MALFM"),e("1129","Rabbit Production","KANIN"),
  e("1129","Worm Farming","MASKFM"),e("1131","Sustainable Forestry","HALSK"),e("1132","Seed Production","FROVK"),
  e("1133","Selective Logging","GALRN"),e("1141","Deep Sea Fishing","DJPHV"),e("1141","Freshwater Fishing","INVFK"),
  e("1142","Wildlife Management","VILTVD"),e("1151","Aerial Crop Services","FLYGSP"),e("1151","Irrigation Services","BEVTN"),
  e("1151","Precision Agriculture","PRECJS"),e("1152","Artificial Insemination","SEMNR"),e("1152","Hoof Trimming Services","HOVVD"),
  e("1153","Reforestation Services","ATRPL"),e("1153","Forest Pest Control","SKGPLG"),e("1111","Organic Grain Farming","EKOSD"),
  e("1112","Organic Vegetable Farming","EKOGR"),e("1113","Organic Fruit Farming","EKOFR"),e("1121","Organic Dairy","EKOMJ"),
  e("1114","Vertical Farming","VERTFM"),e("1114","Hydroponic Production","HYDPN"),e("1114","Aquaponic Production","AKVPN"),
  e("1119","Industrial Hemp","INDMPF"),e("1151","Agricultural Drone Services","DRNFM"),e("1151","Soil Testing Services","JRDPR"),
  e("1152","Animal Nutrition Consulting","FODRB"),e("1153","Urban Forestry","STADSK"),e("1125","Seaweed Farming","TANGFM"),
  e("1129","Insect Farming","INSFM"),e("1131","Carbon Forest Management","KOLSKV"),e("1111","Cover Crop Services","TCKGR"),
  e("1151","Farm Equipment Services","MASKTJ"),e("1119","Spice Farming","KRYDFM"),e("1113","Coffee Farming","KAFFE"),
  e("1113","Cocoa Farming","KAKAOF"),e("1119","Tea Farming","TEFMRK"),
  e("1114","Mushroom Farming","SVMPFM"),
];

// ─── WHOLESALE (105) — Root: HANDEL ──────────────────────────────────────
const WHOLESALE_SUBS: SubEntry[] = [
  e("4231","Motor Vehicle Parts Wholesalers","BILDR"),e("4232","Furniture Wholesalers","MOBLH"),e("4233","Lumber Wholesalers","TRAHD"),
  e("4234","Professional Equipment Wholesalers","YRKEH"),e("4234","Medical Equipment Wholesalers","MEDIW"),e("4234","Dental Equipment Wholesalers","TANDW"),
  e("4234","Laboratory Equipment Wholesalers","LABBW"),e("4234","Photographic Equipment Wholesalers","FOTOW"),e("4235","Metal Wholesalers","METLH"),
  e("4235","Coal Wholesalers","KOLHD"),e("4235","Minerals Wholesalers","MINHD"),e("4236","Electrical Equipment Wholesalers","ELHND"),
  e("4236","Electronic Parts Wholesalers","KOMPH"),e("4236","Computer Equipment Wholesalers","DATHD"),e("4237","Hardware Wholesalers","JRNHD"),
  e("4237","Plumbing Equipment Wholesalers","RORHD"),e("4237","HVAC Equipment Wholesalers","KLIMHD"),e("4238","Machinery Wholesalers","MASKHD"),
  e("4238","Farm Machinery Wholesalers","JORDMH"),e("4238","Construction Equipment Wholesalers","BYGMHD"),e("4238","Industrial Machinery Wholesalers","INDMHD"),
  e("4241","Paper Wholesalers","PAPHD"),e("4242","Drug Wholesalers","LAKHD"),e("4243","Apparel Wholesalers","KLADHD"),
  e("4244","Grocery Wholesalers","MATHD"),e("4244","Dairy Product Wholesalers","MJLKHD"),e("4244","Confectionery Wholesalers","GODHD"),
  e("4244","Fish and Seafood Wholesalers","FISKHD"),e("4244","Meat Wholesalers","KOTHD"),e("4244","Fresh Fruit Wholesalers","FRKHD"),
  e("4245","Farm Product Raw Material Wholesalers","RAAHD"),e("4245","Grain Wholesalers","SPNHD"),e("4245","Livestock Wholesalers","DJRHD"),
  e("4246","Chemical Wholesalers","KEMHD"),e("4246","Plastics Wholesalers","PLAHD"),e("4247","Petroleum Wholesalers","OLJHD"),
  e("4248","Beer and Wine Wholesalers","DRYKHD"),e("4249","Miscellaneous Durable Goods Wholesalers","DIVHD"),e("4249","Sporting Goods Wholesalers","SPOHD"),
  e("4249","Toy Wholesalers","LEKHD"),e("4249","Jewelry Wholesalers","GULHD"),e("4251","Electronic Markets and Agents","NETTHD"),
  e("4251","Wholesale Trade Agents","AGENTHD"),e("4231","Tire Wholesalers","DACKHD"),e("4231","Auto Body Parts Wholesalers","KRPHD"),
  e("4232","Home Furnishing Wholesalers","HEMHD"),e("4233","Building Material Wholesalers","BYGHD"),e("4234","Surgical Equipment Wholesalers","KIRHD"),
  e("4235","Recycled Metal Wholesalers","ATRVHD"),e("4236","Wire and Cable Wholesalers","KABHD"),e("4237","Safety Equipment Wholesalers","SAKHD"),
  e("4238","Printing Machinery Wholesalers","TRYHD"),e("4241","Packaging Material Wholesalers","FRPHD"),e("4242","Veterinary Drug Wholesalers","VETLHD"),
  e("4243","Footwear Wholesalers","SKOHD"),e("4244","Frozen Food Wholesalers","FRYHD"),e("4244","Organic Food Wholesalers","EKOHD"),
  e("4245","Seed Wholesalers","FROHD"),e("4245","Fertilizer Wholesalers","GODHD"),e("4246","Industrial Chemical Wholesalers","INKEHD"),
  e("4247","Fuel Oil Wholesalers","BRANHD"),e("4247","Lubricant Wholesalers","SMORJHD"),e("4248","Spirits Wholesalers","SPRHD"),
  e("4249","Art Goods Wholesalers","KNSTHD"),e("4249","Stationery Wholesalers","KONHD"),e("4251","B2B Online Marketplaces","NETMHD"),
  e("4234","Office Equipment Wholesalers","BRHD"),e("4236","Solar Equipment Wholesalers","SOLHD"),e("4237","Fastener Wholesalers","FASTHD"),
  e("4238","Food Processing Equipment Wholesalers","LIVSM"),e("4242","Generic Drug Wholesalers","GENHD"),e("4242","Biotech Product Wholesalers","BIOHD"),
  e("4244","Beverage Wholesalers","DRYHD"),e("4244","Specialty Food Wholesalers","DELHD"),e("4245","Cotton Wholesalers","BOMHD"),
  e("4246","Fertilizer and Pesticide Wholesalers","GODJHD"),e("4247","Natural Gas Wholesalers","GASHD"),e("4248","Non-Alcoholic Beverage Wholesalers","LASCHD"),
  e("4249","Office Furniture Wholesalers","KONTMHD"),e("4249","Musical Instrument Wholesalers","MUSHD"),e("4251","Drop Shipping Services","DROPHD"),
  e("4234","Janitorial Equipment Wholesalers","STAHD"),e("4236","Lighting Equipment Wholesalers","LJUHD"),e("4238","Material Handling Equipment Wholesalers","HANTHD"),
  e("4244","Bakery Product Wholesalers","BAGHD"),e("4249","School Supply Wholesalers","SKOLHD"),
  e("4231","Heavy Truck Parts Wholesalers","TUNGHD"),e("4232","Mattress Wholesalers","MADRSHD"),e("4233","Roofing Material Wholesalers","TAKHD"),
  e("4234","Veterinary Equipment Wholesalers","VETHD"),e("4235","Scrap Metal Wholesalers","SKRTHD"),e("4236","Battery Wholesalers","AKUMHD"),
  e("4237","Tool Wholesalers","VERKHD"),e("4238","Packaging Machinery Wholesalers","PACKHD"),e("4241","Industrial Paper Wholesalers","INDPHD"),
  e("4243","Uniform Wholesalers","UNIFHD"),e("4244","Coffee Wholesalers","KAFEHD"),e("4244","Snack Food Wholesalers","SMATHD"),
  e("4245","Hay and Feed Wholesalers","HOYHD"),e("4246","Paint Wholesalers","FRGHHD"),e("4247","Aviation Fuel Wholesalers","JETBHD"),
  e("4248","Craft Beer Wholesalers","HNTOHD"),e("4249","Gift Wholesalers","GAVOHD"),e("4251","Wholesale Auction Platforms","AUDKHD"),
  e("4234","Fitness Equipment Wholesalers","GYMHD"),
];

// ─── HOSPITALITY (120) — Root: GASTVR ───────────────────────────────────
const HOSPITALITY_SUBS: SubEntry[] = [
  e("7211","Traveler Accommodation","OVRNT"),e("7211","Hotels","HOTLL"),e("7211","Motels","MOTLL"),
  e("7211","Resort Hotels","SMRTH"),e("7211","Casino Hotels","SPELH"),e("7211","Boutique Hotels","LITNH"),
  e("7211","Extended Stay Hotels","LANGB"),e("7211","Airport Hotels","FLYGBH"),e("7212","RV Parks and Campgrounds","KAMPN"),
  e("7212","RV Parks","VAGNP"),e("7212","Campgrounds","TALTV"),e("7212","Glamping Resorts","LYXCM"),
  e("7213","Rooming and Boarding Houses","PENSION"),e("7213","Hostels","VANDH"),e("7213","Bed and Breakfast","FRKST"),
  e("7221","Full-Service Restaurants","MATSL"),e("7221","Fine Dining Restaurants","GASTRO"),e("7221","Casual Dining Restaurants","VARDGR"),
  e("7221","Family Restaurants","FAMLJR"),e("7221","Ethnic Restaurants","UTVLDR"),e("7222","Limited-Service Restaurants","SNABB"),
  e("7222","Fast Food Restaurants","DRIVTH"),e("7222","Fast Casual Restaurants","HALVSR"),e("7222","Cafeterias","SJLVSR"),
  e("7222","Buffet Restaurants","BUFFETR"),e("7223","Special Food Services","SARMAT"),e("7223","Food Service Contractors","MATAVT"),
  e("7223","Caterers","CATERIR"),e("7223","Mobile Food Services","FOODTR"),e("7224","Drinking Places","BARKR"),
  e("7224","Bars and Taverns","KROGR"),e("7224","Nightclubs","NATTK"),e("7224","Brewpubs","BRYGGP"),
  e("7211","Luxury Hotels","LXHTL"),e("7211","Conference Hotels","KONFH"),e("7211","Health Spa Hotels","SPAWH"),
  e("7211","All-Inclusive Resorts","ALLINKR"),e("7211","Ski Resorts","SKIDSR"),e("7211","Beach Resorts","STRANDR"),
  e("7211","Golf Resorts","GOLFR"),e("7211","Eco Lodges","EKOLGR"),e("7211","Historic Inns","HISTGR"),
  e("7212","State Parks Camping","NATPRK"),e("7212","National Parks Concessions","PARKTJ"),e("7212","Cabin Rentals","STUGUR"),
  e("7213","Vacation Rentals","SEMSTR"),e("7213","Home Sharing Platforms","DELBOL"),e("7213","Corporate Housing","FIRMAB"),
  e("7221","Steakhouses","KOTTHR"),e("7221","Seafood Restaurants","FISKRR"),e("7221","Italian Restaurants","ITALIR"),
  e("7221","Asian Restaurants","ASIATR"),e("7221","Mexican Restaurants","MEXIKR"),e("7221","French Restaurants","FRANSKR"),
  e("7221","Indian Restaurants","INDSKR"),e("7221","Sushi Restaurants","SUSHIR"),e("7222","Pizza Delivery","PIZZAR"),
  e("7222","Sandwich Shops","SMORGR"),e("7222","Coffee Shops","KAFEVR"),e("7222","Ice Cream Shops","GLASSKR"),
  e("7222","Juice and Smoothie Bars","JUICBR"),e("7222","Donut Shops","MUNKVR"),e("7223","Hospital Food Services","SJUKMR"),
  e("7223","School Food Services","SKOLMR"),e("7223","Airline Catering","FLYGMR"),e("7223","Military Food Services","FORSML"),
  e("7223","Prison Food Services","FANGMR"),e("7223","Corporate Catering","FIRMAMR"),e("7224","Wine Bars","VINBR"),
  e("7224","Cocktail Lounges","DRNKSR"),e("7224","Sports Bars","SPORTR"),e("7224","Comedy Clubs","HUMRVR"),
  e("7211","Pet-Friendly Hotels","DJURH"),e("7211","Themed Hotels","TEMAHTL"),e("7211","Capsule Hotels","KAPSLH"),
  e("7211","Wellness Retreats","HALSRT"),e("7212","Marina and Boat Camps","HAMNCM"),e("7213","Agritourism Lodging","GARDBO"),
  e("7221","Farm-to-Table Restaurants","JARDMR"),e("7221","Pop-Up Restaurants","TILLMR"),e("7221","Ghost Kitchens","MOLN"),
  e("7222","Drive-Through Only","GENOMR"),e("7222","Meal Kit Services","MATLDA"),e("7222","Vending Restaurants","AUTMTR"),
  e("7223","Event Catering","FESTMR"),e("7223","Disaster Relief Feeding","NODMTR"),e("7224","Karaoke Bars","SANGBR"),
  e("7224","Cigar Lounges","ROKSR"),e("7211","Timeshare Resorts","ANDELR"),e("7211","Serviced Apartments","BTHEMR"),
  e("7212","Yurt Camps","JURTCM"),e("7213","Coliving Spaces","SAMBOR"),e("7221","Supper Clubs","KVALLR"),
  e("7222","Bakery Cafes","BAGKFR"),e("7223","Commissary Kitchens","STORKR"),e("7224","Tasting Rooms","PROVSR"),
  e("7211","Airport Lounges","LOUNGR"),e("7211","Micro Hotels","MIKRHR"),e("7221","Brunch Restaurants","BRNCHR"),
  e("7222","Poke and Bowl Shops","SKALVR"),e("7223","Meal Delivery Platforms","HEMKRVR"),e("7224","Rooftop Bars","TAKBR"),
  e("7211","Underwater Hotels","DYKHTR"),e("7211","Treehouse Hotels","TRADHTR"),e("7212","Dark Sky Camps","STJRCM"),
  e("7221","Omakase Restaurants","KOCKSR"),e("7222","Robot Restaurants","ROBMTR"),e("7224","Speakeasy Bars","HEMGBR"),
  e("7211","Ice Hotels","ISHTLR"),e("7211","Desert Resorts","OKNRSR"),e("7211","Mountain Lodges","BERGLR"),
  e("7212","Overlanding Camps","OVRLCM"),e("7213","Farm Stays","GRDSTR"),e("7221","Ramen Shops","NUDLRR"),
  e("7221","Barbecue Restaurants","GRILLR"),e("7222","Acai Bowl Shops","BARSKR"),e("7222","Bubble Tea Shops","BOBLTR"),
  e("7223","Stadium Food Services","ARNMTR"),e("7224","Beer Gardens","BIERSR"),e("7224","Hookah Lounges","VATPSR"),
];

// ─── ENTERTAINMENT (120) — Root: LJUS ───────────────────────────────────
const ENTERTAINMENT_SUBS: SubEntry[] = [
  e("7111","Performing Arts Companies","SCENK"),e("7111","Theater Companies","TEATER"),e("7111","Dance Companies","DANSSK"),
  e("7111","Musical Groups","MUSIKGR"),e("7111","Opera Companies","OPERAS"),e("7111","Circus Companies","CIRKUS"),
  e("7112","Spectator Sports","TITTSK"),e("7112","Professional Sports Teams","PROFLAG"),e("7112","Horse Racing","TRAVSP"),
  e("7112","Auto Racing","BILRSP"),e("7112","Boxing and MMA","KAMPSPR"),e("7112","Professional Golf","GOLFPR"),
  e("7113","Promoters of Events","ARRANGR"),e("7113","Concert Promoters","KONSRT"),e("7113","Festival Organizers","FESTVAL"),
  e("7113","Sports Event Promoters","SPORTEV"),e("7114","Agents and Managers","TALANTR"),e("7114","Talent Agencies","AGENTUR"),
  e("7114","Artist Management","KONSTMG"),e("7114","Sports Agents","SPORTA"),e("7115","Independent Artists and Performers","FRILNS"),
  e("7115","Stand-Up Comedians","HUMOR"),e("7115","Magicians and Illusionists","TROLLK"),e("7115","Musicians, Independent","MUSIKFR"),
  e("7121","Museums","MUSEER"),e("7121","Art Museums","KONSTML"),e("7121","History Museums","HISTRM"),
  e("7121","Science Museums","VETNSKM"),e("7121","Children's Museums","BARNMS"),e("7121","Natural History Museums","NATRMS"),
  e("7121","Technology Museums","TEKNMS"),e("7122","Historical Sites","HISTOR"),e("7122","Heritage Sites","MINNES"),
  e("7122","Archaeological Sites","ARKEOL"),e("7131","Amusement Parks","NOJESP"),e("7131","Theme Parks","TEMAPR"),
  e("7131","Water Parks","VATNPR"),e("7132","Gambling Industries","SPELND"),e("7132","Casinos","KASINO"),
  e("7132","Slot Machine Operators","AUTOMT"),e("7132","Online Gambling","NATSPEL"),e("7132","Lottery Operations","LOTTRR"),
  e("7132","Sports Betting","VADSPR"),e("7139","Other Amusement","NOJENR"),e("7139","Bowling Centers","KLOTSP"),
  e("7139","Miniature Golf","BANGFL"),e("7139","Escape Rooms","FLYKT"),e("7139","Trampoline Parks","STUDSPR"),
  e("7139","Laser Tag Facilities","LASERSP"),e("7139","Go-Kart Tracks","KARTSP"),e("7139","Arcades","SPELHL"),
  e("7211","Skiing Facilities","SKIDNL"),e("7211","Ice Skating Rinks","SKRDNL"),e("7141","Fitness Centers","GYMSAL"),
  e("7141","Yoga Studios","YOGASR"),e("7141","CrossFit Gyms","KORSGY"),e("7141","Personal Training Studios","TRANSR"),
  e("7141","Martial Arts Studios","KAMPSR"),e("7141","Swimming Pools","SIMBSS"),e("7141","Tennis Clubs","TENNSK"),
  e("7141","Golf Courses","GOLFBN"),e("7141","Climbing Gyms","KLTRGY"),e("7141","Dance Studios","DANSSR"),
  e("5121","Motion Picture Production","FILMPR"),e("5121","Television Production","TVPROD"),e("5121","Animation Studios","ANIMST"),
  e("5121","Documentary Production","DOKFLM"),e("5121","Music Production","LJUDST"),e("5121","Podcast Production","PODDST"),
  e("5122","Motion Picture Distribution","FILMDST"),e("5122","Television Distribution","TVDIST"),e("5122","Streaming Services","STROMTJ"),
  e("5131","Radio Broadcasting","RADIOS"),e("5131","Music Radio","MUSIKRD"),e("5131","Talk Radio","SAMTLRD"),
  e("5131","Public Radio","FOLKRD"),e("5132","Television Broadcasting","TVSAND"),e("5132","Cable Television Networks","KABELN"),
  e("5132","Streaming TV Networks","STROMT"),e("5139","Other Broadcasting","OVRSND"),e("7111","Comedy Clubs","SKAMTV"),
  e("7111","Improv Companies","IMPRSK"),e("7112","E-Sports Organizations","ESPORT"),e("7112","Professional Soccer","FOTBLPR"),
  e("7112","Professional Basketball","KORGPR"),e("7113","Trade Show Organizers","MESSARR"),e("7113","Convention Centers","KONGRSC"),
  e("7114","Literary Agents","BOKAGENR"),e("7115","Street Performers","GATUSK"),e("7121","Planetariums","PLANTR"),
  e("7121","Aquariums","AKVARM"),e("7122","Battlefields and Memorials","MINNESM"),e("7131","Fun Centers","LEKLAND"),
  e("7131","Adventure Parks","AVENTRP"),e("7132","Bingo Operations","BINGOSP"),e("7132","Card Rooms","KORTSP"),
  e("7139","Axe Throwing","YXKASP"),e("7139","Virtual Reality Centers","VRCENTR"),e("7141","Pickleball Clubs","PKBLLKL"),
  e("7141","Boxing Gyms","BOXNGY"),e("5121","Virtual Production","VIRTPROD"),e("5121","VR Content Creation","VRINHL"),
  e("5122","Film Festivals","FILMFST"),e("5131","Satellite Radio","SATLRD"),e("5132","Local TV Stations","LOKALTV"),
  e("7112","Professional Tennis","TENNPR"),e("7121","Botanical Gardens","BOTNSK"),e("7131","Zip Line Parks","REPBNPR"),
  e("7139","Haunted Attractions","SPOKELS"),e("7141","Pilates Studios","PILATSR"),
  e("7112","Professional Hockey","HOCKPR"),e("7112","Professional Cricket","CRKPRL"),e("7113","Food Festival Organizers","MATFST"),
  e("7121","Aviation Museums","FLYGMS"),e("7121","Maritime Museums","SJOMSR"),e("7131","Splash Pads and Spray Parks","SPRUTPR"),
  e("7139","Rage Rooms","RASERSP"),e("7141","Rowing Clubs","RODDSR"),e("5121","True Crime Production","BROTPRD"),
  e("5132","Sports Networks","SPORTTV"),
];

// ─── MINING (105) — Root: BERG ───────────────────────────────────────────
const MINING_SUBS: SubEntry[] = [
  e("2111","Oil and Gas Extraction","OLJBR"),e("2111","Crude Petroleum Extraction","RAOLJ"),e("2111","Natural Gas Extraction","NATGS"),
  e("2111","Oil Sands Extraction","OLJSN"),e("2111","Shale Gas Extraction","SKFFGS"),e("2112","Natural Gas Liquid Extraction","VTSGS"),
  e("2121","Coal Mining","KOLBR"),e("2121","Bituminous Coal Mining","SVRTKL"),e("2121","Anthracite Mining","HRDKL"),
  e("2121","Lignite Mining","BRNKL"),e("2122","Metal Ore Mining","MALMB"),e("2122","Iron Ore Mining","JRNML"),
  e("2122","Gold Ore Mining","GULDM"),e("2122","Silver Ore Mining","SILVML"),e("2122","Copper Ore Mining","KPPRML"),
  e("2122","Nickel Ore Mining","NKKLML"),e("2122","Lead and Zinc Mining","BLYML"),e("2122","Uranium Ore Mining","URNML"),
  e("2123","Nonmetallic Mineral Mining","STENBR"),e("2123","Dimension Stone Mining","BLCKST"),e("2123","Crushed Stone Mining","KROSST"),
  e("2123","Sand and Gravel Mining","SANDGR"),e("2123","Clay Mining","LERBR"),e("2123","Potash Mining","KALIBR"),
  e("2123","Phosphate Mining","FOSFBR"),e("2123","Gypsum Mining","GIPSBR"),e("2131","Support Activities for Mining","BRGTJ"),
  e("2131","Drilling Oil and Gas Wells","BORRTJ"),e("2131","Well Servicing","BRNTJ"),e("2131","Mine Site Preparation","FORBRD"),
  e("2131","Exploration Services","LETATJ"),e("2111","Offshore Drilling","HAVBRR"),e("2111","Deepwater Extraction","DJUPHV"),
  e("2111","Enhanced Oil Recovery","FORSTK"),e("2111","Coalbed Methane","KOLMTN"),e("2111","Tight Oil Extraction","TATLJ"),
  e("2112","NGL Fractionation","FRAKTN"),e("2121","Surface Coal Mining","DAGBRR"),e("2121","Underground Coal Mining","UNDGRB"),
  e("2122","Platinum Group Mining","PLATBR"),e("2122","Lithium Mining","LITMBR"),e("2122","Titanium Mining","TITNBR"),
  e("2122","Cobalt Mining","KOBLTBR"),e("2122","Rare Earth Mining","SALLJBR"),e("2122","Bauxite Mining","BAXTBR"),
  e("2123","Limestone Mining","KALKBR"),e("2123","Marble Quarrying","MARBR"),e("2123","Granite Quarrying","GRNTBR"),
  e("2123","Salt Mining","SALTBR"),e("2123","Talc Mining","TALKBR"),e("2123","Mica Mining","GLMBR"),
  e("2131","Hydraulic Fracturing Services","FRKKTJ"),e("2131","Seismic Survey Services","SEISTJ"),e("2131","Logging, Well","LOGGBR"),
  e("2131","Directional Drilling","RIKTTJ"),e("2131","Cementing Services","CEMNTJ"),e("2131","Mud Logging","SLAMTJ"),
  e("2111","Carbon Capture from Wells","KOLFTJ"),e("2111","Geothermal Extraction","JORDVBR"),e("2112","Helium Extraction","HLMBR"),
  e("2122","Tin Mining","TENNBR"),e("2122","Tungsten Mining","WOLFBR"),e("2122","Manganese Mining","MGNSBR"),
  e("2122","Chromite Mining","KROMBR"),e("2123","Feldspar Mining","FLTSBR"),e("2123","Silica Sand Mining","KVTSBR"),
  e("2123","Perlite Mining","PRLTBR"),e("2123","Vermiculite Mining","VRMLBR"),e("2131","Mine Reclamation","ATRSKP"),
  e("2131","Mine Dewatering","AVTTNBR"),e("2131","Mine Ventilation","LUFTBR"),e("2131","Assay Services","PROVBR"),
  e("2111","Methane Capture","MTNFNG"),e("2122","Vanadium Mining","VNDBR"),e("2122","Molybdenum Mining","MLYBR"),
  e("2123","Diatomite Mining","DIATBR"),e("2123","Bentonite Mining","BENTBR"),e("2131","Core Drilling Services","KRNBRTJ"),
  e("2131","Wireline Services","LINTJ"),e("2131","Coiled Tubing Services","RORTJ"),e("2111","Hydrogen from Wells","VATGBR"),
  e("2122","Graphite Mining","GRAFBR"),e("2123","Zeolite Mining","ZOLTBR"),e("2131","Mine Safety Services","SAKTJ"),
  e("2131","Blasting Services","SPRNGTJ"),
  e("2111","Liquid Natural Gas Extraction","LNGBR"),e("2111","Condensate Recovery","KNDSBR"),e("2122","Antimony Mining","ANTMBR"),
  e("2122","Tantalum Mining","TNTLBR"),e("2122","Niobium Mining","NIOBR"),e("2122","Zirconium Mining","ZRKBR"),
  e("2123","Kaolin Mining","KAOLBR"),e("2123","Barite Mining","BARTBR"),e("2123","Wollastonite Mining","WLSTBR"),
  e("2123","Pumice Mining","PIMSBR"),e("2131","Mine Surveying","MATBRT"),e("2131","Completion Services","SLUTBR"),
  e("2131","Workover Services","OVRHTJ"),e("2131","Stimulation Services","STIMBR"),e("2111","Steam-Assisted Gravity Drainage","SAGDBR"),
  e("2121","Coal Washing and Preparation","KOLTVBR"),e("2122","Spodumene Mining","SPODBR"),e("2123","Industrial Diamond Mining","DIAMTBR"),
  e("2131","Environmental Monitoring, Mining","MILJOVBR"),e("2131","Tailings Management","AVGNBR"),
];

// ─── ADMINISTRATIVE (120) — Root: ORDNA ─────────────────────────────────
const ADMINISTRATIVE_SUBS: SubEntry[] = [
  e("5611","Office Administrative Services","KONTRS"),e("5611","Executive Suites","CHEFSR"),e("5611","Virtual Office Services","VIRTKS"),
  e("5612","Facilities Support Services","LOKSTD"),e("5613","Employment Services","ARBFRM"),e("5613","Temporary Staffing","TILLFR"),
  e("5613","Permanent Placement","FASTAN"),e("5613","Executive Search","CHEFSSK"),e("5613","Staffing Agencies","BEMFRM"),
  e("5614","Business Support Services","FORTTJ"),e("5614","Document Preparation","DOKSRV"),e("5614","Telephone Call Centers","RINGCN"),
  e("5614","Collection Agencies","INKSTJ"),e("5614","Credit Bureaus","KRDTBY"),e("5615","Travel Arrangement Services","RESARR"),
  e("5615","Tour Operators","TUROPER"),e("5615","Travel Agencies","RESEBY"),e("5615","Convention Planning","KONGRPL"),
  e("5616","Investigation and Security","BEVAKG"),e("5616","Investigation Services","UTRDTJ"),e("5616","Guard Services","VAKTBOL"),
  e("5616","Armored Car Services","VARDTR"),e("5616","Security Systems Services","LARMSY"),e("5616","Locksmith Services","LASMTJ"),
  e("5617","Services to Buildings","FASTSK"),e("5617","Exterminating Services","SKADTJ"),e("5617","Janitorial Services","STADTJ"),
  e("5617","Landscaping Services","MARKSK"),e("5617","Carpet Cleaning","MATTTV"),e("5617","Building Maintenance","UNDRTJ"),
  e("5619","Other Support Services","OVRTJ"),e("5619","Packaging Services","PACKTJ"),e("5619","Convention Services","MESSBTJ"),
  e("5619","Copying and Duplicating","KOPTJ"),e("5621","Waste Collection","AVFHMT"),e("5621","Residential Waste Collection","HUSAVF"),
  e("5621","Commercial Waste Collection","FIRMAVF"),e("5621","Hazardous Waste Collection","FARLAVF"),e("5622","Waste Treatment and Disposal","AVFBEH"),
  e("5622","Landfill Operations","DEPTJ"),e("5622","Hazardous Waste Treatment","FARLBEH"),e("5622","Incineration Services","FORBRTJ"),
  e("5629","Remediation Services","SANERITJ"),e("5629","Environmental Remediation","MILJTJ"),e("5629","Asbestos Abatement","ASBESTTJ"),
  e("5629","Lead Paint Abatement","BLYTJ"),e("5611","Shared Services Centers","GEMSTJ"),e("5611","Business Process Outsourcing","UTLGTJ"),
  e("5611","Mail Processing Services","POSTTJ"),e("5612","Property Management Support","FASTFR"),e("5613","Nurse Staffing","SJUKBM"),
  e("5613","IT Staffing","DATBEM"),e("5613","Legal Staffing","JURBEM"),e("5613","Construction Staffing","BYGBEM"),
  e("5613","Healthcare Staffing","HALSBEM"),e("5614","Answering Services","SVARST"),e("5614","Data Entry Services","DATINS"),
  e("5614","Transcription Services","AVSKRT"),e("5614","Court Reporting","DOMSKR"),e("5615","Corporate Travel Management","FIRMARES"),
  e("5615","Destination Management","DESTMG"),e("5615","Incentive Travel","BELRES"),e("5616","Background Check Services","BKGRTJ"),
  e("5616","Drug Testing Services","DROGTST"),e("5616","Polygraph Services","LGNDTST"),e("5616","Cybersecurity Monitoring","DATAOV"),
  e("5617","Window Cleaning","FNSTTV"),e("5617","Pressure Washing","HTRKTV"),e("5617","Snow Removal","SNOROV"),
  e("5617","Parking Lot Maintenance","PARKSK"),e("5619","Shredding Services","FORSTTJ"),e("5619","Uniform Supply","UNIFSRV"),
  e("5619","Linen Supply","LINNSTJ"),e("5621","Recycling Collection","ATRVSTJ"),e("5621","Construction Debris Removal","BYGAVF"),
  e("5621","Medical Waste Collection","MEDAVF"),e("5622","Composting Operations","KOMPTJ"),e("5622","Wastewater Treatment","VATBEH"),
  e("5622","Solid Waste Disposal","FASTAVF"),e("5629","Mold Remediation","MOGLTJ"),e("5629","Underground Storage Tank Removal","TANKTJ"),
  e("5629","Soil Remediation","JORDTJ"),e("5611","Coworking Space Operations","SAMBSR"),e("5612","Energy Management Services","ENERGTJ"),
  e("5613","Gig Worker Platforms","GIGBTJ"),e("5614","Virtual Assistant Services","VASSTJ"),e("5615","Medical Tourism Coordination","MEDTRS"),
  e("5616","Video Surveillance Services","KAMTJ"),e("5617","Green Cleaning Services","GRNSTD"),e("5619","Flagging Services","FLAGTJ"),
  e("5621","E-Waste Collection","ELAVF"),e("5622","Tire Recycling","DCKAVF"),e("5629","Brownfield Remediation","BRNFTJ"),
  e("5611","Records Management","ARKIVTJ"),e("5613","Seasonal Staffing","ARSTBEM"),e("5614","Overflow Call Centers","OFLTJ"),
  e("5616","Access Control Services","INTRTJ"),e("5617","Graffiti Removal","KLTRTJ"),e("5619","Auction Services","AUKTTJ"),
  e("5621","Roll-Off Container Services","RULLTJ"),e("5622","Industrial Waste Treatment","INDAVF"),e("5629","PCB Remediation","PCBTJ"),
  e("5611","Printing and Mailing Services","TRYCKTJ"),e("5613","Skilled Trades Staffing","HNTBEM"),e("5616","Fire Watch Services","BRDVTJ"),
  e("5617","Elevator Maintenance","HISSTJ"),e("5619","Moving and Storage Coordination","FLYTKO"),e("5621","Portable Restroom Services","TOATJ"),
  e("5622","Autoclaving Services","STERTJ"),e("5629","Mine Reclamation Services","GRUVTJ"),
  e("5611","Compliance Administration Services","REGELTJ"),e("5612","Workplace Safety Services","SAKTJR"),e("5613","Freelance Platforms","FRILSTJ"),
  e("5614","AI Chatbot Services","BOTTJR"),e("5615","Space Tourism Arrangement","RYMDRS"),e("5616","Canine Security Services","HUNDVTJ"),
  e("5617","Facade Cleaning","FSDTJR"),e("5619","Wayfinding Services","VAGVSTJ"),e("5621","Textile Recycling","TYGTJR"),
  e("5629","Radiation Remediation","STRLNTJ"),
];

// ─── MANAGEMENT (105) — Root: LEIDA ──────────────────────────────────────
const MANAGEMENT_SUBS: SubEntry[] = [
  e("5511","Management of Companies","KONCRN"),e("5511","Bank Holding Companies","BNKHLD"),e("5511","Insurance Holding Companies","FRSHLD"),
  e("5511","Utility Holding Companies","NYTHLD"),e("5511","Healthcare Holding Companies","SJKHLD"),e("5511","Media Holding Companies","MEDHLD"),
  e("5511","Technology Holding Companies","TEKHLD"),e("5511","Industrial Holding Companies","INDHLD"),e("5511","Retail Holding Companies","DETHLD"),
  e("5511","Hospitality Holding Companies","GSTHHLD"),e("5511","Transportation Holding Companies","TRPHLD"),e("5511","Energy Holding Companies","ENRHLD"),
  e("5512","Offices of Other Holding Companies","OVRHLD"),e("5512","Real Estate Holding Companies","IMHLD"),e("5512","Investment Holding Companies","INVHLD"),
  e("5512","Family Holding Companies","FAMHLD"),e("5512","Multi-Industry Holdings","MLTIHLD"),e("5512","Private Equity Holdings","EKNHLD"),
  e("5511","Conglomerates","FLRINDR"),e("5511","Multinational Holding Companies","INTRHLD"),e("5511","Regional Holding Companies","REGHLD"),
  e("5511","Municipal Holding Companies","KOMHLD"),e("5511","Defense Holding Companies","FRSVHLD"),e("5511","Pharmaceutical Holding Companies","LKMDHL"),
  e("5511","Agricultural Holding Companies","JRDHLD"),e("5511","Construction Holding Companies","BYGHLD"),e("5511","Mining Holding Companies","GRUHLD"),
  e("5511","Telecommunications Holding Companies","TLKHLD"),e("5511","Entertainment Holding Companies","NOJHLD"),e("5511","Education Holding Companies","UTBHLD"),
  e("5512","Special Purpose Vehicles","SARBOL"),e("5512","Statutory Trusts","LAGSTR"),e("5512","Business Trusts","AFTSTR"),
  e("5512","Blind Trusts","BLINDSTR"),e("5512","Voting Trusts","ROSTSTR"),e("5511","Financial Services Holdings","FNTJHLD"),
  e("5511","Aerospace Holdings","FLYGVHLD"),e("5511","Automotive Holdings","BILHLD"),e("5511","Food and Beverage Holdings","LIVHLD"),
  e("5511","Chemical Holdings","KEMHLD"),e("5512","Venture Capital Holdings","RISKHLD"),e("5512","Sovereign Wealth Funds","STVFHLD"),
  e("5512","Pension Fund Management","PNSNHLD"),e("5512","Endowment Management Offices","STFTHLD"),e("5512","Foundation Management","FNDTHLD"),
  e("5511","Diversified Industrials","DVRSIND"),e("5511","Infrastructure Holdings","INFRHLD"),e("5511","Water Holdings","VATNHLD"),
  e("5511","Cannabis Holdings","HAMPHLD"),e("5511","Fintech Holdings","FNTKHLD"),e("5512","Captive Finance Companies","FNGBLAG"),
  e("5512","Orphan SPVs","UTSARB"),e("5512","Securitization Vehicles","VARDPPR"),e("5511","Shared Services Holding","GEMTJHLD"),
  e("5512","Liquidating Trusts","AVVKSTR"),e("5512","Grantor Trusts","STFSTR"),e("5511","Sports Holdings","SPORTHLD"),
  e("5511","Healthcare IT Holdings","SJKITHLD"),e("5511","Green Energy Holdings","GRONHLD"),e("5511","PropTech Holdings","FASTHLD"),
  e("5512","Delaware Statutory Trusts","DELSTR"),e("5512","Collateralized Loan Obligations","LANOBL"),e("5511","Biotech Holdings","BIOTHLD"),
  e("5511","Logistics Holdings","LOGSHLD"),e("5511","Staffing Holdings","BEMHLD"),e("5512","Employee Stock Ownership Trusts","MEDSTR"),
  e("5512","Charitable Trusts","GODHSTR"),e("5512","Land Trusts","JRDSTR"),e("5511","Insurance Group Holdings","FORSGR"),
  e("5511","Reinsurance Holdings","ATRFHLD"),e("5511","Wholesale Holdings","GROSHLD"),e("5512","Structured Finance Vehicles","STRFIN"),
  e("5512","Government-Sponsored Entities","STENTHT"),e("5511","Natural Resources Holdings","NATRHLD"),e("5511","Professional Services Holdings","PRFSHLD"),
  e("5512","Opportunity Zone Funds","ZONDFND"),e("5512","Interval Fund Holdings","INTFHLD"),e("5511","Waste Management Holdings","AVFHLD"),
  e("5511","Security Holdings","SAKHLD"),e("5511","Maritime Holdings","SJOFHLD"),e("5511","Aviation Holdings","FLYGHLD"),
  e("5512","Tax Credit Syndicators","SKTSYND"),e("5512","Qualified Opportunity Funds","KVLFND"),
  e("5511","Data Center Holdings","DCHLD"),e("5511","Renewable Energy Holdings","FORNHLD"),e("5511","E-Commerce Holdings","NETHLD"),
  e("5511","Gaming Holdings","SPELHLD"),e("5511","Cybersecurity Holdings","CYBSHLD"),e("5512","Royalty Trusts","RLTYSTR"),
  e("5512","Unit Investment Trusts","ANDSTR"),e("5512","Master Limited Partnerships","MSTRPL"),e("5511","Luxury Goods Holdings","LYXHLD"),
  e("5511","Fitness Industry Holdings","GYMHLD"),e("5511","Pet Industry Holdings","DJURHLD"),e("5511","Space Industry Holdings","RYMHLD"),
  e("5512","Infrastructure Trusts","INFRSTR"),e("5512","Healthcare REITs Management","HLSREIT"),e("5511","Private Label Holdings","PRIVHLD"),
  e("5511","Battery and EV Holdings","BATTHLD"),e("5512","Income Trusts","INKMSTR"),e("5511","Cold Chain Holdings","KYLHLD"),
  e("5511","AgTech Holdings","AGTHLD"),e("5512","Timber Trusts","SKOGSTR"),e("5511","Payments Holdings","BETAHLD"),
  e("5512","Water Rights Trusts","VATSTR"),
];

// ─── NONPROFIT (105) — Root: FRIHET ──────────────────────────────────────
const NONPROFIT_SUBS: SubEntry[] = [
  e("8131","Religious Organizations","TROSAR"),e("8131","Churches","KYRKORG"),e("8131","Mosques","MOSKORG"),
  e("8131","Synagogues","TEMPELRG"),e("8131","Temples","GUDSHSR"),e("8132","Grantmaking Foundations","STIFTGV"),
  e("8132","Private Foundations","PRIVSTF"),e("8132","Community Foundations","SAMHSTF"),e("8132","Corporate Foundations","FIRMSTF"),
  e("8132","Family Foundations","FAMSTF"),e("8133","Social Advocacy Organizations","FRSVAR"),e("8133","Human Rights Organizations","RATIGHR"),
  e("8133","Environmental Advocacy","MILJFOR"),e("8133","Civil Rights Organizations","MEDBORG"),e("8133","Animal Rights Organizations","DJURFOR"),
  e("8134","Civic and Social Organizations","SAMHFOR"),e("8134","Community Service Clubs","KLUBBAR"),e("8134","Fraternal Organizations","BRDRSK"),
  e("8134","Veterans Organizations","VETRNORG"),e("8134","Alumni Associations","ALUMNFR"),e("8139","Business Associations","AFFRORG"),
  e("8139","Professional Associations","YRKSFR"),e("8139","Labor Unions","FACKFRN"),e("8139","Chambers of Commerce","HNDLKAM"),
  e("8139","Trade Associations","BRSCHFR"),e("8211","Educational Nonprofits","UTBLNNP"),e("8211","Scholarship Funds","STIPFRN"),
  e("8211","Literacy Organizations","LASFORN"),e("8211","Museums as Nonprofits","MUSFRN"),e("8211","Libraries as Nonprofits","BIBLFRN"),
  e("8211","Research Institutes","FORSKINP"),e("6241","Social Services Nonprofits","SOSOFRN"),e("6241","Food Banks as Nonprofits","MATHJLP"),
  e("6241","Housing Nonprofits","BOSTHJLP"),e("6241","Youth Development","UNGDOMNP"),e("6241","Aging Services Nonprofits","ALDRNP"),
  e("6241","Disability Services Nonprofits","FUNKTJNP"),e("6241","Immigrant Services Nonprofits","NYANL"),e("6241","Legal Aid Nonprofits","RATHJLP"),
  e("6221","Hospital Nonprofits","SJUKNP"),e("6221","Community Health Nonprofits","HALSANP"),e("6221","Mental Health Nonprofits","PSYKNP"),
  e("6221","Addiction Recovery Nonprofits","MISSNP"),e("8133","Policy Research Organizations","TANKSMJ"),e("8133","Public Interest Law","ALLMJUR"),
  e("8133","Consumer Advocacy","KONSFRN"),e("8134","Neighborhood Associations","GRNNFR"),e("8134","Cultural Organizations","KULTRFR"),
  e("8134","Heritage Preservation","BVRNDFR"),e("8139","Standards Setting Bodies","STNDRDORG"),e("8139","Accreditation Bodies","ACKRDORG"),
  e("8131","Missionary Organizations","MISSNORG"),e("8131","Interfaith Organizations","RELSFR"),e("8132","Donor-Advised Funds","GVRDFRN"),
  e("8132","Operating Foundations","DRIFTFRN"),e("8133","Anti-Poverty Organizations","FATGFRN"),e("8133","Peace Organizations","FREDFRN"),
  e("8133","LGBTQ+ Organizations","PRIDFRN"),e("8134","Ethnic Cultural Organizations","ETKNFRN"),e("8134","Garden Clubs","TRADFR"),
  e("8139","Athletic Associations","IDRTFRN"),e("8139","Honorary Societies","SALLSFRN"),e("8211","Science Education Nonprofits","VETPEDFRN"),
  e("8211","Arts Education Nonprofits","KSTPEDFRN"),e("6241","Disaster Relief Nonprofits","NDSHJLP"),e("6241","Refugee Resettlement Nonprofits","FLYKTFRN"),
  e("6241","Domestic Violence Nonprofits","TRYGGFRN"),e("6221","Free Clinics","FRIKLINP"),e("8132","Health Research Foundations","HLSOFRSK"),
  e("8133","Disability Rights Organizations","FUNKRFRN"),e("8134","Youth Sports Organizations","BRNIDRT"),e("8139","Industry Coalitions","BRSCHKL"),
  e("8211","Public Broadcasting Nonprofits","PUBMEDNP"),e("6241","Microfinance Nonprofits","SMALNP"),e("8131","Retreat Centers","RETREATFR"),
  e("8132","Fiscal Sponsors","FSKSPONS"),e("8133","Whistleblower Protection","VISLFRN"),e("8134","Cooperative Associations","SAMVKFRN"),
  e("8139","Bar Associations","ADVKFRN"),e("8211","Environmental Education","MILJPED"),e("6241","Employment Services Nonprofits","ARBNP"),
  e("8131","Faith-Based Social Services","TROHJLP"),e("8132","Impact Investment Foundations","IMPSTF"),e("8133","Digital Rights Organizations","DIGRFRN"),
  e("8134","Historical Societies","HISTRFRN"),
  e("8131","Monastic Communities","KLSTRFRN"),e("8131","Chaplaincy Organizations","PRSTRFRN"),e("8132","Endowed Chairs Management","PROFFRN"),
  e("8132","Scholarship Endowments","STIPSTF"),e("8133","Voting Rights Organizations","VALRTFRN"),e("8133","Immigration Advocacy","INVNFRN"),
  e("8133","Gun Safety Organizations","VAPENFRN"),e("8134","Rotary Clubs","ROTRYFRN"),e("8134","Lions Clubs","LEJNFRN"),
  e("8134","Scouting Organizations","SCOUTFRN"),e("8139","Medical Associations","LAKRFRN"),e("8139","Engineering Societies","TEKNFRN"),
  e("8211","STEM Education Nonprofits","STEMFRN"),e("8211","Workforce Development Nonprofits","ARBFRN"),e("6241","Child Advocacy Centers","BRNFRN"),
  e("6241","Reentry Services Nonprofits","ATERFRN"),e("6221","Rural Health Nonprofits","LNDHNP"),e("8132","Arts Foundations","KSTFRN"),
  e("8133","Climate Action Nonprofits","KLIMFRN"),e("8134","Civic Technology Organizations","MEDTEKFRN"),
];

// ─── PUBLIC_COMPANY (120) — Root: BORSEN ────────────────────────────────
const PUBLIC_COMPANY_SUBS: SubEntry[] = [
  e("5231","NYSE Listed Companies","NYSEBR"),e("5231","NASDAQ Listed Companies","NASDQBR"),e("5231","OTC Markets","OTCMRK"),
  e("5231","Foreign Private Issuers","UTLBRS"),e("5231","Dual Listed Companies","DUBBRS"),e("5231","SPAC Vehicles","SPACBRS"),
  e("5231","Direct Listings","DIRBRS"),e("5231","IPO Process","IPOBRS"),e("5239","SEC Reporting","SECRPT"),
  e("5239","10-K Annual Reports","ARSBRS"),e("5239","10-Q Quarterly Reports","KVRTLBRS"),e("5239","8-K Current Reports","SNABBRS"),
  e("5239","Proxy Statements","FULLMBRS"),e("5239","Schedule 13D Filings","STORBRS"),e("5239","Section 16 Filings","INSDRBRS"),
  e("5239","Beneficial Ownership Reporting","AGRBRS"),e("5411","Securities Litigation","BORSTVST"),e("5411","Shareholder Class Actions","AKTGRPR"),
  e("5411","Derivative Litigation","BOLGTLNR"),e("5411","SEC Enforcement Defense","SECFRSVR"),e("5411","Insider Trading Cases","INSDRMÅL"),
  e("5416","Corporate Governance Consulting","STYRBRDT"),e("5416","Board Advisory","RADGVBRD"),e("5416","ESG Consulting, Public","HLLBRHBRS"),
  e("5416","Executive Compensation Consulting","LONBRSTL"),e("5416","Investor Relations","INVRLTNR"),e("5412","Audit, Public Company","REVSNBRS"),
  e("5412","Sarbanes-Oxley Compliance","SOXEFTRB"),e("5412","PCAOB Standards","PCAOBSTD"),e("5412","Internal Audit, Public","INTRVSNB"),
  e("5412","Tax Planning, Public Company","SKTPLNBR"),e("5231","Equity Offerings","AKTEMBRS"),e("5231","Debt Offerings","OBLEMSBR"),
  e("5231","Convertible Offerings","KONVBRS"),e("5231","At-the-Market Offerings","MRKTEMB"),e("5231","Rights Offerings","RATTEMBR"),
  e("5231","Shelf Registrations","HYLLEBRS"),e("5239","Form S-1 Registration","REGSBRS"),e("5239","Form S-3 Registration","SHELFREG"),
  e("5239","Rule 144 Compliance","REGEL144"),e("5239","Regulation D Offerings","REGDBRS"),e("5239","Regulation A+ Offerings","REGABRS"),
  e("5239","Crowdfunding Compliance","FOLKFINB"),e("5416","M&A Advisory, Public","FUSIONBRS"),e("5416","Proxy Fight Advisory","FULLMSTRD"),
  e("5416","Activist Defense","AKTVFRSV"),e("5416","Fairness Opinions","RATTVSBRS"),e("5416","Restructuring Advisory","OMSTRBRS"),
  e("5411","Antitrust, Public Company","KONKURRBRS"),e("5411","Patent Litigation, Public","PATENTBRS"),e("5411","Environmental Litigation, Public","MILJTVSTB"),
  e("5411","FCPA Compliance","FCPABRS"),e("5411","Export Control Compliance","EXPKNTRL"),e("5412","Revenue Recognition Compliance","INTKTBRS"),
  e("5412","Lease Accounting Compliance","HYRRDVSNB"),e("5412","Impairment Testing","NEDSKRVB"),e("5412","Segment Reporting","SEGMENTRP"),
  e("5412","Business Combination Accounting","FORVRVBRS"),e("5231","Market Making","MRKTNDBRS"),e("5231","Block Trading","STRTRDNB"),
  e("5231","Dark Pool Access","MORKRMRK"),e("5231","Algorithmic Trading Compliance","ALGOTRDNG"),e("5231","High-Frequency Trading","HFTTRDNGB"),
  e("5239","Form 4 Insider Reporting","INSDRRPTG"),e("5239","Regulation FD Compliance","REGFDBRS"),e("5239","Earnings Guidance","PROGNSBRS"),
  e("5239","Material Event Disclosure","VASENTLBR"),e("5239","Risk Factor Disclosure","RISKFKTBR"),e("5416","Sustainability Reporting, Public","HLLBRPTBR"),
  e("5416","Climate Risk Disclosure","KLIMRSKBR"),e("5416","Human Capital Disclosure","HUMANKAPB"),e("5416","Cybersecurity Disclosure","DATASKBRS"),
  e("5416","Supply Chain Disclosure","KEDJAREDV"),e("5412","XBRL Tagging Compliance","XBRLTAGGB"),e("5412","Audit Committee Services","REVKNMTTB"),
  e("5412","Whistleblower Programs","VISLRPRGB"),e("5412","Clawback Compliance","ATERTAGBR"),e("5411","Short-Selling Regulation","BLNKREGBR"),
  e("5411","Market Manipulation","MRKMANPLB"),e("5411","Tender Offer Compliance","ERBJUDNDB"),e("5416","Shareholder Engagement","AKTGRENGB"),
  e("5416","Annual Meeting Planning","ARSSTOAMM"),e("5416","Board Diversity Compliance","STRLMANGB"),e("5239","Cross-Border Listings","GRAOVRLSTB"),
  e("5239","ADR Programs","ADRPROGRMB"),e("5239","SEC Exemptive Relief","SECUNDNTGB"),e("5231","Secondary Offerings","SEKAKTEMBR"),
  e("5231","Follow-On Offerings","FOLJAEMBRS"),e("5412","Going Concern Assessment","FORTSTDFT"),e("5412","Management Discussion Analysis","LEDNINGANA"),
  e("5416","Crisis Communications, Public","KRISKOMBRS"),e("5416","Takeover Defense","OVERTAGFRB"),e("5411","Whistleblower Retaliation","VISLVEDGLT"),
  e("5239","Beneficial Ownership Transparency","AGARTRANSB"),e("5416","Digital Asset Governance","DIGSTYRBRB"),e("5412","Non-GAAP Measures","EJGAAPMATT"),
  e("5231","Venture Exchange Listings","VENTRLSTNG"),e("5239","EDGAR Filing Services","EDGARFILNG"),e("5416","Transfer Agent Services","OVERFRAGNT"),
  e("5411","Shareholder Derivative Actions","DERIVATLNR"),e("5412","Environmental Accounting","MILJREDVSN"),
  e("5416","Proxy Advisory Response","PROXYRADSB"),e("5231","Bond Listings","OBLGLSTNGB"),e("5239","Form 20-F Compliance","FORM20FBRS"),
  e("5412","Crypto Asset Accounting","KRYPTRDVNB"),e("5416","Stakeholder Capitalism","INTRESNTMB"),
  e("5231","Pink Sheet Companies","ROSABRS"),e("5231","Micro-Cap Exchanges","MIKRBRS"),e("5239","Form 6-K Compliance","FORM6KBRS"),
  e("5239","Say-on-Pay Compliance","LONROSTBRS"),e("5412","Stock Compensation Accounting","AKTLONBRS"),e("5412","Goodwill Impairment Testing","GODWLBRS"),
  e("5416","Succession Planning, Public","EFTRDBRS"),e("5416","Board Evaluation Services","STRLBDMRB"),e("5411","Securities Fraud Defense","BEDRGRSBRS"),
  e("5411","Regulatory Investigation Response","UTRDNBRS"),e("5239","Tender Offer Filings","ERBJFLBRS"),e("5412","Consolidation Accounting","KONSLDBRS"),
  e("5416","Shareholder Activism Response","AKTVSTBRS"),e("5231","Green Bond Listings","GRONOBLBRS"),
];

// ─── OTHER_SERVICES (105) — Root: VINDSK ─────────────────────────────────
const OTHER_SERVICES_SUBS: SubEntry[] = [
  e("8111","Automotive Repair and Maintenance","BILVRK"),e("8111","General Automotive Repair","ALLMBLRP"),e("8111","Auto Body Repair","PLTRPRTN"),
  e("8111","Auto Glass Repair","GLASRPRTN"),e("8111","Auto Exhaust Repair","AVGSRPRTN"),e("8111","Transmission Repair","VXLRPRTN"),
  e("8111","Tire Repair and Retreading","DCKRPRTN"),e("8111","Oil Change Services","OLJBYTSRV"),e("8112","Electronic Equipment Repair","ELRPRTN"),
  e("8112","Computer Repair","DATORRPR"),e("8112","Appliance Repair","VITVRPRTN"),e("8112","Phone Repair","TELRPRTN"),
  e("8113","Commercial Equipment Repair","KOMRPRTN"),e("8113","Industrial Equipment Repair","INDRPRTN"),e("8113","Welding Repair","SVRPRTN"),
  e("8114","Personal and Household Goods Repair","HUSRPRTN"),e("8114","Furniture Repair and Upholstery","MBLRPRTN"),e("8114","Shoe Repair","SKORPRTN"),
  e("8114","Watch and Jewelry Repair","URRPRTN"),e("8121","Personal Care Services","PRSNTJNST"),e("8121","Hair Salons","FRISSALON"),
  e("8121","Barber Shops","HERRKLPNG"),e("8121","Nail Salons","NAGELSALN"),e("8121","Skin Care Services","HUDVRDTJ"),
  e("8121","Spa Services","SPATJNST"),e("8121","Tattoo Parlors","TATVRNGTJ"),e("8122","Funeral Homes","BEGRVNING"),
  e("8122","Crematories","KREMTRNG"),e("8122","Cemeteries","BGRVNPLTS"),e("8122","Memorial Services","MINNSTJNST"),
  e("8123","Dry Cleaning and Laundry","TVTTSRVCE"),e("8123","Commercial Laundry","STRTVATTSRV"),e("8123","Coin-Operated Laundry","MYNTTVATTSRV"),
  e("8123","Linen and Uniform Supply","LINNTJNST"),e("8123","Carpet and Upholstery Cleaning","MTTRNGRING"),e("8129","Pet Care Services","DJURSKTTJ"),
  e("8129","Pet Grooming","DJURPUTS"),e("8129","Pet Boarding","DJURHOT"),e("8129","Dog Walking Services","HUNDPRMND"),
  e("8129","Pet Training","DJURTRNG"),e("8129","Photo Finishing","FOTOFRAMK"),e("8129","Parking Lots and Garages","PARKTJNST"),
  e("8129","Dating Services","DEJTTJNST"),e("8129","Party Planning","FESTPLNRNG"),e("8111","Brake Repair","BROMSRPRTN"),
  e("8111","Alignment Services","HJULINST"),e("8111","Auto Electrical Repair","BILELRPRTN"),e("8111","Diesel Repair","DSLRPRTN"),
  e("8111","RV Repair","HUSVRPRTN"),e("8111","Marine Repair","BATRPRTN"),e("8112","Audio Visual Repair","AVRPRTN"),
  e("8112","Medical Equipment Repair","MEDRPRTN"),e("8113","Forklift Repair","TRUCKREP"),e("8113","Generator Repair","GENRPRTN"),
  e("8114","Locksmith Services","LASSMDRPR"),e("8114","Tailor and Alteration","SKRDDRTJ"),e("8121","Massage Therapy","MASSTJNST"),
  e("8121","Eyebrow and Lash Services","OGNFRNSTJ"),e("8121","Permanent Makeup","PRMNTSMNK"),e("8122","Green Burial Services","EKOBGRVNG"),
  e("8122","Pre-Need Funeral Planning","FORPLNBGR"),e("8123","Wedding Dress Preservation","BRUDKLNNG"),e("8123","Leather Cleaning","LDERRNGNG"),
  e("8129","Concierge Services","CONCRGTJN"),e("8129","Personal Shopping","PRSNINPNG"),e("8129","Home Organization","HEMORDNTJ"),
  e("8129","Key Duplication","NYCKLKPTJ"),e("8111","Hybrid and EV Repair","ELHYBDRPR"),e("8111","Auto Detailing","BILTVATTSRV"),
  e("8112","Drone Repair","DRNRPRTN"),e("8112","Camera Repair","KAMERARPR"),e("8113","Restaurant Equipment Repair","KOEQRPRTN"),
  e("8114","Musical Instrument Repair","INSTRPRTN"),e("8121","Mobile Beauty Services","MOBILSKN"),e("8122","Pet Cremation","DJURKRMTN"),
  e("8123","Specialty Cleaning","SPCLRNGNG"),e("8129","Personal Fitness Training","PRSNTRNG"),e("8129","Life Coaching","LIVSCCHTJ"),
  e("8129","Notary Services","NOTARTJNST"),e("8129","Errand Services","ARENDTJNST"),e("8111","Fleet Maintenance","FLTTNDRHLL"),
  e("8112","Copier and Printer Repair","SKRIVRPRTN"),e("8113","Crane Repair","KRANLGRPR"),e("8114","Bicycle Repair","CYKLRPRTN"),
  e("8121","Tanning Salons","SOLRTJNST"),e("8122","Body Transportation","TRNSPRTBGR"),e("8123","Industrial Cleaning","INDSTRNGNG"),
  e("8129","Gift Wrapping Services","INSLAGNTJN"),
  e("8111","Motorcycle Repair","MCRPRTN"),e("8111","Boat Detailing","BTDTLSRV"),e("8112","Smart Home Repair","SMHRPRTN"),
  e("8112","Wearable Device Repair","BRBLRPRTN"),e("8113","HVAC Equipment Repair","KLIMRPRTN"),e("8113","Hydraulic Equipment Repair","HYDRRPRTN"),
  e("8114","Luggage Repair","VSKREPRTN"),e("8114","Antique Restoration","ANTIKRPRTN"),e("8121","Teeth Whitening Services","TANDBLKTJ"),
  e("8121","Hair Removal Services","HARSRTJNST"),e("8122","Celebration of Life Services","LIVSFRTJNST"),e("8123","Shoe Cleaning Services","SKORNGRNNG"),
  e("8129","Personal Chef Services","PRSNCHEFSRV"),e("8129","House Sitting Services","HUSSITTTJN"),e("8129","Mobile Notary Services","MOBILNTTJN"),
  e("8129","Estate Sale Services","BOPDTJNST"),e("8129","Valet Services","BILVKTTJNST"),
];

// ─── GENERAL (120) — Root: ALLVAR ───────────────────────────────────────
const GENERAL_SUBS: SubEntry[] = [
  e("9999","General Compliance","GRUNDL"),e("9999","Multi-Industry Compliance","FLERIND"),e("9999","Cross-Sector Compliance","TVARSKT"),
  e("9999","Federal Compliance General","BUNDAFT"),e("9999","State Compliance General","DELSTAFT"),e("9999","Local Compliance General","KOMMUAFT"),
  e("9999","Tribal Compliance General","STAMMAFT"),e("9999","International Compliance","INTRNAFT"),e("9999","Anti-Money Laundering","PENTVAFT"),
  e("9999","Know Your Customer","KUNDKNN"),e("9999","Bank Secrecy Act","BNKHEML"),e("9999","Sanctions Compliance","SANKTAFT"),
  e("9999","Export Control Compliance","EXPKNTRL"),e("9999","Trade Compliance","HANDLAFT"),e("9999","Customs Compliance","TULLAFT"),
  e("9999","Tax Compliance General","SKATTAFT"),e("9999","Employment Compliance General","ARBTSAFT"),e("9999","OSHA Compliance","ARBETSMJ"),
  e("9999","Environmental Compliance General","MILJOAFT"),e("9999","Clean Air Act Compliance","LUFTRENAFT"),e("9999","Clean Water Act Compliance","VATRENAFT"),
  e("9999","RCRA Compliance","AVFLHNTAFT"),e("9999","CERCLA Compliance","SUPFRNDAFT"),e("9999","Privacy Compliance General","INTGRNSAFT"),
  e("9999","HIPAA Compliance","SJUKVDSEKR"),e("9999","FERPA Compliance","UTBILDSEKR"),e("9999","COPPA Compliance","BARNSEKRFT"),
  e("9999","CCPA/CPRA Compliance","KALIFSEKR"),e("9999","GDPR Compliance","GDPREFTLVN"),e("9999","Data Breach Response","DATBROTT"),
  e("9999","Cybersecurity Compliance General","CYBRSEKRAFT"),e("9999","NIST Framework Compliance","NISTRAMVERK"),e("9999","CMMC Compliance","CMMCEFTLVN"),
  e("9999","FedRAMP Compliance","FEDRMPAFT"),e("9999","SOC 2 Compliance","SOCTVAAFTLV"),e("9999","PCI DSS Compliance","PCIDSSAFTLV"),
  e("9999","ISO 27001 Compliance","ISOSEKRAFT"),e("9999","Accessibility Compliance","TILLGNGAFT"),e("9999","ADA Compliance","ADAEFTLVNAD"),
  e("9999","Section 508 Compliance","SEKT508AFT"),e("9999","Fair Housing Compliance","BOSTADRTTAF"),e("9999","Equal Employment Compliance","JMSTLDHAFT"),
  e("9999","EEOC Compliance","EEOCEFTLVND"),e("9999","FLSA Compliance","ARBTSTDAFT"),e("9999","FMLA Compliance","FMLAEFTLVND"),
  e("9999","Workers Compensation Compliance","ARBTSKDAFT"),e("9999","Immigration Compliance","INVANDRRAFT"),e("9999","I-9 Compliance","INIOEFTLVND"),
  e("9999","ERISA Compliance","ERISAEFTLVN"),e("9999","COBRA Compliance","COBRAEFTLVN"),e("9999","Affordable Care Act Compliance","ACAEFTLVNAD"),
  e("9999","Consumer Protection Compliance","KONSUMENTFT"),e("9999","FTC Act Compliance","FTCEFTLVNAD"),e("9999","Truth in Lending Compliance","KRDTSNNAFT"),
  e("9999","Fair Debt Collection Compliance","INKASSOFTLV"),e("9999","Dodd-Frank Compliance","DODDFRNKAFT"),e("9999","Volcker Rule Compliance","VOLCKEREFTL"),
  e("9999","Basel III Compliance","BASELTREFTL"),e("9999","Insurance Compliance General","FORSAKRNGFT"),e("9999","Securities Compliance General","VARDPPRSAFT"),
  e("9999","Commodity Trading Compliance","RAVRUHDLAFT"),e("9999","Real Estate Compliance General","FASTIGHETAF"),e("9999","Construction Compliance General","BYGGNADAFT"),
  e("9999","Food Safety Compliance","LIVSMDELAFT"),e("9999","Drug Safety Compliance","LAKEMDELAFT"),e("9999","Medical Device Compliance","SJUKVUTRFTL"),
  e("9999","Pharmaceutical Compliance","FARMACIAFT"),e("9999","Laboratory Compliance","LABORATIAFT"),e("9999","Nuclear Regulatory Compliance","KARNKRAFTAF"),
  e("9999","Aviation Compliance","FLYGSAKRAFT"),e("9999","Maritime Compliance","SJOSAKRHAFT"),e("9999","Railroad Compliance","JARNVAGSAFT"),
  e("9999","Pipeline Compliance","RORLEDNGAFT"),e("9999","Telecommunications Compliance","TELEKOMAFT"),e("9999","Broadcasting Compliance","SANDNGSAFT"),
  e("9999","Intellectual Property Compliance","IMMTRLRTTAF"),e("9999","Copyright Compliance","UPPHOVSRAFT"),e("9999","Trademark Compliance","VARUMARKAFT"),
  e("9999","Patent Compliance","PATENTEFTLV"),e("9999","Nonprofit Compliance General","IDEELLAFTLV"),e("9999","Political Activity Compliance","POLAKTIVAFT"),
  e("9999","Lobbying Compliance","LOBBYAFTLVN"),e("9999","Campaign Finance Compliance","VALFNANSAFT"),e("9999","Government Contracting Compliance","STATUPPHDL"),
  e("9999","FAR Compliance","FAREFTLVNAD"),e("9999","Small Business Compliance","SMAFTGAFT"),e("9999","Franchise Compliance","FRANCHISEAF"),
  e("9999","Antitrust Compliance","KONKURRNSAF"),e("9999","Whistleblower Compliance","VISSLBLSAFT"),e("9999","Corporate Governance Compliance","BOLSTYRRAFT"),
  e("9999","Board Compliance","STYRELSEAFT"),e("9999","Ethics Compliance General","ETIKAFTLVND"),e("9999","Conflict of Interest Compliance","JAVTJNSTAFT"),
  e("9999","Gift and Entertainment Compliance","GAVOAFTLVND"),e("9999","Records Retention Compliance","ARKIVERNGAF"),e("9999","Document Control Compliance","DOKUSTRNGAF"),
  e("9999","Audit Compliance General","REVISIONAFT"),e("9999","Internal Controls Compliance","INTRNTKNRFT"),e("9999","Risk Management Compliance","RISKHANTRFT"),
  e("9999","Business Continuity Compliance","KONTNUITTAF"),e("9999","Disaster Recovery Compliance","ATERSTALAFT"),e("9999","Quality Management Compliance","KVLTSTYRRAF"),
  e("9999","ISO 9001 Compliance","ISONIOTUSN"),e("9999","Six Sigma Compliance","SEXSIGMAAFT"),e("9999","Lean Compliance","LEANEFTLVND"),
  e("9999","Supply Chain Compliance","LEVRKEDJAFT"),e("9999","Vendor Management Compliance","LEVERTRRAFT"),e("9999","Third-Party Risk Compliance","TRDJPRTRAFT"),
  e("9999","AI Governance Compliance","AISTRNINGAF"),e("9999","Algorithmic Accountability","ALGORITMAFT"),e("9999","Digital Accessibility","DIGTALLTLGN"),
  e("9999","Climate Disclosure Compliance","KLIMTREDVSN"),e("9999","ESG Reporting Compliance","ESGRAPPORTAF"),e("9999","Human Trafficking Compliance","MANNISKOHDL"),
  e("9999","Conflict Minerals Compliance","KONFLKTMNRL"),e("9999","Modern Slavery Compliance","MODRNSLVRAF"),e("9999","Beneficial Ownership Compliance","VERKLIGAGAF"),
  e("9999","Corporate Transparency Act","BOLGTRANSPF"),e("9999","Cross-Border Data Transfer","DATAOVERFNG"),e("9999","Emerging Regulation Monitoring","NYREGLEROVK"),
];

// ═══════════════════════════════════════════════════════════════════════════
// Archetype parent mapping
// ═══════════════════════════════════════════════════════════════════════════

const ARCHETYPE_PARENTS: Record<string, string> = {
  HEALTHCARE: "REGULIS",
  FINANCE: "FISCARA",
  MANUFACTURING: "INTEGRA",
  PROFESSIONAL_SERVICES: "ETHICARA",
  CONSTRUCTION: "INTEGRA",
  TECHNOLOGY: "SYNTARA",
  RETAIL: "ADVOCIS",
  TRANSPORTATION: "INTEGRA",
  EDUCATION: "REGULIS",
  GOVERNMENT: "REGULIS",
  DEFENSE: "VIGILUS",
  REAL_ESTATE: "FISCARA",
  UTILITIES: "INTEGRA",
  AGRICULTURE: "REGULIS",
  WHOLESALE: "FISCARA",
  HOSPITALITY: "ADVOCIS",
  ENTERTAINMENT: "ADVOCIS",
  MINING: "INTEGRA",
  ADMINISTRATIVE: "INTEGRA",
  MANAGEMENT: "LEXARC",
  NONPROFIT: "ETHICARA",
  PUBLIC_COMPANY: "CLARIDEX",
  OTHER_SERVICES: "REGULIS",
  GENERAL: "REGULIS",
};

// Industry roots for naming
const INDUSTRY_ROOTS: Record<string, string> = {
  HEALTHCARE: "VARD",
  FINANCE: "SCHATZ",
  MANUFACTURING: "STAL",
  PROFESSIONAL_SERVICES: "FACHK",
  CONSTRUCTION: "STEIN",
  TECHNOLOGY: "KRAFT",
  RETAIL: "HAMN",
  TRANSPORTATION: "WAGEN",
  EDUCATION: "ADOHI",
  GOVERNMENT: "TINGS",
  DEFENSE: "WACHT",
  REAL_ESTATE: "GRUND",
  UTILITIES: "STROM",
  AGRICULTURE: "SELU",
  WHOLESALE: "HANDEL",
  HOSPITALITY: "GASTVR",
  ENTERTAINMENT: "LJUS",
  MINING: "BERG",
  ADMINISTRATIVE: "ORDNA",
  MANAGEMENT: "LEIDA",
  NONPROFIT: "FRIHET",
  PUBLIC_COMPANY: "BORSEN",
  OTHER_SERVICES: "VINDSK",
  GENERAL: "ALLVAR",
};

// ═══════════════════════════════════════════════════════════════════════════
// Build the full catalog
// ═══════════════════════════════════════════════════════════════════════════

interface IndustryConfig {
  industry: string;
  subs: SubEntry[];
}

const ALL_INDUSTRIES: IndustryConfig[] = [
  { industry: "HEALTHCARE", subs: HEALTHCARE_SUBS },
  { industry: "FINANCE", subs: FINANCE_SUBS },
  { industry: "MANUFACTURING", subs: MANUFACTURING_SUBS },
  { industry: "PROFESSIONAL_SERVICES", subs: PROFESSIONAL_SERVICES_SUBS },
  { industry: "CONSTRUCTION", subs: CONSTRUCTION_SUBS },
  { industry: "TECHNOLOGY", subs: TECHNOLOGY_SUBS },
  { industry: "RETAIL", subs: RETAIL_SUBS },
  { industry: "TRANSPORTATION", subs: TRANSPORTATION_SUBS },
  { industry: "EDUCATION", subs: EDUCATION_SUBS },
  { industry: "GOVERNMENT", subs: GOVERNMENT_SUBS },
  { industry: "DEFENSE", subs: DEFENSE_SUBS },
  { industry: "REAL_ESTATE", subs: REAL_ESTATE_SUBS },
  { industry: "UTILITIES", subs: UTILITIES_SUBS },
  { industry: "AGRICULTURE", subs: AGRICULTURE_SUBS },
  { industry: "WHOLESALE", subs: WHOLESALE_SUBS },
  { industry: "HOSPITALITY", subs: HOSPITALITY_SUBS },
  { industry: "ENTERTAINMENT", subs: ENTERTAINMENT_SUBS },
  { industry: "MINING", subs: MINING_SUBS },
  { industry: "ADMINISTRATIVE", subs: ADMINISTRATIVE_SUBS },
  { industry: "MANAGEMENT", subs: MANAGEMENT_SUBS },
  { industry: "NONPROFIT", subs: NONPROFIT_SUBS },
  { industry: "PUBLIC_COMPANY", subs: PUBLIC_COMPANY_SUBS },
  { industry: "OTHER_SERVICES", subs: OTHER_SERVICES_SUBS },
  { industry: "GENERAL", subs: GENERAL_SUBS },
];

// ═══════════════════════════════════════════════════════════════════════════
// Supplemental entries to reach exactly 2,880 total positions
// 284 additional entries distributed across industries needing more coverage
// ═══════════════════════════════════════════════════════════════════════════

const SUPPLEMENTAL: Record<string, SubEntry[]> = {
  HEALTHCARE: [
    e("6211","Offices of Physicians, Infectious Disease","SMTTR"),e("6211","Offices of Physicians, Pain Management","SMRTL"),
    e("6214","Rural Health Clinics","LANDKL"),e("6215","Point-of-Care Testing","SNBTST"),
    e("6219","Nurse Triage Services","TRIAGV"),
  ],
  MANUFACTURING: [
    e("3254","Compounding Pharmacy Manufacturing","BLANDM"),e("3254","Radiopharmaceutical Manufacturing","STRHLM"),
    e("3261","Composite Material Manufacturing","KOMPSM"),e("3261","3D Printing Manufacturing","TRYCKM"),
    e("3262","Seal and Gasket Manufacturing","TATNGM"),e("3273","Asphalt Manufacturing","ASFLTM"),
    e("3311","Steel Pipe Manufacturing","RORSM"),e("3313","Aluminum Can Manufacturing","BURKMM"),
    e("3321","Cold Forging","KALLSM"),e("3323","Metal Stamping","STANSMM"),
    e("3324","Heat Exchanger Manufacturing","VARXLM"),e("3329","Ball Bearing Manufacturing","KULAGM"),
    e("3331","Forklift Manufacturing","TRUCKMM"),e("3334","Commercial Oven Manufacturing","UGNSM"),
    e("3335","Grinding Machine Manufacturing","SLPMM"),e("3341","Workstation Manufacturing","ARBSM"),
    e("3344","Sensor Manufacturing","GIVARM"),e("3345","Thermostat Manufacturing","TERMOM"),
  ],
  PROFESSIONAL_SERVICES: [
    e("5411","Health Law","HLSOR"),
  ],
  TECHNOLOGY: [
    e("5112","Supply Chain Visibility Software","SIKTK"),e("5112","Regulatory Technology","REGTEK"),
    e("5112","Insurance Technology","FORSTEK"),e("5182","Quantum Computing Services","KVNTM"),
    e("5191","Civic Tech Platforms","SAMHP"),e("5112","Privacy Engineering Tools","PRVTK"),
    e("5172","Private 5G Networks","PRIV5G"),
  ],
  RETAIL: [
    e("4411","Fleet Vehicle Dealers","FLTBIL"),e("4422","Home Decor Stores","DEKORH"),
    e("4451","International Grocery","VARLDM"),e("4461","Wellness Stores","HALVH"),
    e("4481","Sustainable Fashion Stores","EKOMOD"),e("4492","Vinyl Record Stores","SKIVH"),
    e("4539","Candle and Home Fragrance Stores","DOFTH"),
  ],
  TRANSPORTATION: [
    e("4931","Automated Warehouse Systems","AUTLG"),e("4921","Drone Delivery Services","DRNLV"),
  ],
  EDUCATION: [
    e("6113","Data Science Programs","DATAVSK"),e("6115","Cybersecurity Training","SAKERSK"),
    e("6116","Robotics Programs","ROBOTSK"),e("6117","Enrollment Management","ANTAGSK"),
  ],
  GOVERNMENT: [
    e("9211","Ombudsman Offices","OMBDVD"),e("9222","Drug Enforcement","NARKVD"),
    e("9281","Tribal Social Services","STAMTJ"),e("9711","Coast Guard Operations","KSTVD"),
  ],
  DEFENSE: [
    e("3364","Military Drone Manufacturing","DRNMVF"),e("3489","Directed Energy Weapons","LASWVF"),
    e("5415","AI Warfare Systems","AISYSVF"),e("5415","Predictive Maintenance Software","PREDVF"),
    e("3344","Counter-Drone Systems","ANTDRVF"),e("5617","Explosive Ordnance Disposal","EODSVF"),
    e("5416","Wargaming Services","KRGSPVF"),e("3345","Biometric Systems, Military","BIOMVF"),
    e("5415","Tactical Data Links","TAKTDVF"),e("3364","Stealth Technology","SMYGVF"),
    e("5417","Quantum Computing, Defense","KVNTVF"),e("5415","Space Domain Awareness","RYMSVF"),
  ],
  REAL_ESTATE: [
    e("5311","Industrial Outdoor Storage Lessors","UTLAGHR"),e("5312","Investment Sales Brokers","INVSMK"),
    e("5313","Workplace Strategy Consulting","ARBSRD"),e("5259","REITs, Cell Tower","BORTORN"),
    e("5313","PropTech Advisory","TEKFRD"),
  ],
  UTILITIES: [
    e("2211","Green Hydrogen Production","GRONVT"),e("2212","Grid-Scale Battery Storage","STORBAT"),
    e("2221","Smart Water Metering","SMARTVT"),e("2222","Biodigester Operations","BIOAVL"),
  ],
  AGRICULTURE: [
    e("1125","Trout Farming","FORLFM"),
  ],
  WHOLESALE: [
    e("4236","Robotics Equipment Wholesalers","ROBHD"),e("4234","Cannabis Equipment Wholesalers","HANPHD"),
    e("4238","Renewable Energy Equipment Wholesalers","FORNHD"),e("4249","Craft Supply Wholesalers","SLOJHD"),
  ],
  HOSPITALITY: [
    e("7211","Container Hotels","CONTHTR"),e("7211","Ice Hotels","ISHOTR"),
    e("7211","Safari Lodges","SAFRIHR"),e("7211","Monastery Stays","KLSTRHR"),
    e("7213","House Sitting Platforms","HUSPSSR"),e("7221","Molecular Gastronomy","MOLKYR"),
    e("7221","Vegan Restaurants","VXTMTR"),e("7222","Acai Bowl Shops","SKALR"),
    e("7223","Stadium Food Services","ARENAMT"),e("7223","Theme Park Food Services","NOJESM"),
    e("7224","Arcade Bars","SPELBAR"),e("7224","Board Game Cafes","BRDKFE"),
  ],
  ENTERTAINMENT: [
    e("7141","Rowing Clubs","RODDKL"),e("7141","Cycling Studios","CYKLSR"),
    e("5121","Immersive Experience Production","UPPLEVP"),e("5121","Live Streaming Production","LIVSTR"),
    e("7112","Wrestling Entertainment","BRTNGSP"),e("7132","Fantasy Sports Platforms","FNTSPRT"),
    e("7139","Rage Rooms","KROSSRL"),e("7139","Corn Mazes","MAJSLAB"),
    e("7121","Wax Museums","VAXMSM"),e("7131","Splash Pads and Spray Parks","STANKPR"),
  ],
  MINING: [
    e("2122","Niobium Mining","NIOBMB"),e("2122","Zirconium Mining","ZIRKNB"),
    e("2123","Barite Mining","BARYTB"),e("2131","Environmental Monitoring, Mine","MLJOVKB"),
    e("2111","Enhanced Geothermal Systems","DJPGEO"),
  ],
  ADMINISTRATIVE: [
    e("5611","Compliance Outsourcing","EFTLTJ"),e("5613","Freelance Management Platforms","FRILATJ"),
    e("5614","AI Chatbot Services","AIBOTTJ"),e("5616","Drone Security Services","DRONTJ"),
    e("5617","Solar Panel Cleaning","SOLTVTJ"),e("5619","Mobile Notary Services","MOBNTJ"),
    e("5621","Food Waste Collection","MATAVFTJ"),e("5622","Plasma Gasification","PLSMTJ"),
    e("5629","Radium Remediation","RADNTJ"),e("5629","Unexploded Ordnance Removal","AMMOTJ"),
  ],
  MANAGEMENT: [
    e("5511","Cybersecurity Holdings","CYBHLD"),e("5511","Space Industry Holdings","RYMDHLD"),
    e("5512","Royalty Trusts","ROYSTR"),e("5512","Master Limited Partnerships","MLPHLD"),
    e("5511","Clean Tech Holdings","RENTHLD"),e("5512","Infrastructure Investment Trusts","INVRSTR"),
    e("5511","E-Commerce Holdings","EKOMHLD"),
  ],
  NONPROFIT: [
    e("8132","Climate Action Foundations","KLIMSTF"),e("8133","Data Privacy Advocacy","DATASKFRN"),
    e("8134","Cohousing Associations","BOFRNORG"),e("8139","Certification Bodies","CERTFRN"),
    e("6241","Reentry Services Nonprofits","ATRTJNP"),
  ],
  PUBLIC_COMPANY: [
    e("5239","Section 13F Filings","SEKT13FBR"),e("5239","NYSE Listing Compliance","NYSERGLBR"),
    e("5239","NASDAQ Listing Compliance","NASDQRGLB"),e("5412","Integrated Reporting","INTGRPRTBR"),
    e("5416","Director Independence Assessment","OBLSTRLBRS"),e("5411","Cybersecurity Litigation","CYBTVSTBRS"),
    e("5416","Compensation Committee Advisory","LONKMNTTBR"),e("5231","Green Bond Listings","GRONBLSTNG"),
    e("5239","Conflict Minerals Reporting","KONFLKTRPT"),e("5412","Revenue Cycle Audit","INTKTRVSN"),
    e("5416","ESG Rating Management","ESGBERTYG"),e("5411","Data Privacy Litigation","DATASKTVST"),
    e("5239","Sustainability Bond Programs","HALLBROBLG"),e("5416","Executive Succession Planning","CHFSUCCBRS"),
  ],
  OTHER_SERVICES: [
    e("8111","Motorcycle Repair","MCYRPRTN"),e("8129","Mobile Mechanic Services","MOBILMKNTJ"),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// Second supplemental round — reach exactly 2,880
// ═══════════════════════════════════════════════════════════════════════════

const SUPPLEMENTAL_2: Record<string, SubEntry[]> = {
  HEALTHCARE: [
    e("6211","Offices of Physicians, Hospitalist","INVRTM"),e("6211","Offices of Physicians, Palliative","TROSTM"),
    e("6214","Women's Health Centers","KVINNA"),e("6219","Air Ambulance Services","FLYGAM"),
    e("6215","Molecular Diagnostics","MOLKDD"),e("6232","Traumatic Brain Injury Facilities","HJRNSK"),
    e("6241","Human Trafficking Support Services","HANDLTJ"),e("6219","Remote Patient Monitoring","FJROVR"),
    e("6213","Offices of Midwives","BARNMR"),e("6214","Comprehensive Cancer Centers","ONKLCN"),
  ],
  FINANCE: [],
  MANUFACTURING: [
    e("3254","Nutraceutical Manufacturing","NARPRM"),e("3261","Bioplastics Manufacturing","BOPLM"),
    e("3262","Conveyor Belt Manufacturing","BANDM"),e("3311","Rebar Manufacturing","ARMERM"),
    e("3323","Railing Manufacturing","RACKM"),e("3329","Spring Manufacturing","FJDRM"),
    e("3332","Pump Manufacturing","PUMPMM"),e("3339","Valve Manufacturing","VNTLM"),
    e("3341","Tablet Computer Manufacturing","SURFM"),e("3342","Router Manufacturing","RUTTM"),
    e("3344","Display Manufacturing","SKARMM"),e("3345","Weather Instrument Manufacturing","VADERM"),
    e("3351","Solar Panel Manufacturing","SOLCLM"),e("3353","Generator Manufacturing","DYNMOM"),
    e("3359","Superconductor Manufacturing","SUPRLM"),e("3361","Autonomous Vehicle Manufacturing","SELVKM"),
    e("3363","Exhaust System Manufacturing","AVGSM"),e("3364","Avionics Manufacturing","FLYGEM"),
    e("3366","Pontoon Manufacturing","PONTNM"),e("3391","Wheelchair Manufacturing","RULLSM"),
    e("3399","Candle Manufacturing","LJUSMM"),e("3399","Musical Instrument Manufacturing","INSTMM"),
    e("3399","Sign Manufacturing","SKYLTM"),e("3399","Brush and Broom Manufacturing","BORSTM"),
  ],
  PROFESSIONAL_SERVICES: [
    e("5411","Maritime Law","SJORTT"),e("5411","Aviation Law","FLYGRTT"),
    e("5413","Traffic Engineering","TRAFKNG"),e("5416","Turnaround Consulting","VANDNB"),
    e("5417","Space Research","RYMDFO"),e("5418","Experiential Marketing","UPPLVB"),
    e("5419","Court Interpreter Services","TOLKTJ"),e("5419","Title Search Services","SKNGRV"),
  ],
  CONSTRUCTION: [],
  TECHNOLOGY: [
    e("5112","Legal Technology","JURTEK"),e("5112","Construction Technology","BYGTEK"),
    e("5112","Agricultural Technology","AGRTEK"),e("5112","Music Technology","MUSTEK"),
    e("5182","Sovereign Cloud Services","STATWK"),e("5191","Smart City Platforms","STADTP"),
    e("5112","Autonomous Driving Software","SELVKP"),e("5112","Voice Assistant Platforms","ROSTPL"),
  ],
  RETAIL: [
    e("4431","Drone Stores","DRONBH"),e("4441","Roofing Supply Stores","TAKHV"),
    e("4451","Meal Prep Stores","MATLGH"),e("4461","CBD and Hemp Stores","HAMPBH"),
    e("4481","Luxury Resale Stores","LYXBRH"),e("4491","Climbing Gear Stores","BERGHV"),
    e("4492","Board Game Stores","SPELBH"),e("4539","Crystal and Metaphysical Stores","MYSTBH"),
  ],
  TRANSPORTATION: [
    e("4931","Last-Mile Delivery Hubs","SISTVG"),e("4811","Space Transportation","RYMDTR"),
    e("4853","Autonomous Vehicle Services","SELVKTR"),e("4931","Returns Processing Centers","RETURV"),
    e("4885","Digital Freight Matching","DIGFRT"),
  ],
  EDUCATION: [
    e("6113","Osteopathic Medical Schools","OSTSKL"),e("6115","Barber Schools","BARBSK"),
    e("6115","Massage Therapy Schools","MASSSKL"),e("6116","Equestrian Schools","HSTSKL"),
    e("6117","Education Analytics","ANALSK"),e("6117","Gifted Education Services","BEGVTJ"),
  ],
  GOVERNMENT: [
    e("9222","Park Rangers","PARKRANGV"),e("9222","Fish and Game Enforcement","VILTRATTV"),
    e("9241","Pesticide Programs","GIFTVD"),e("9261","Foreign Aid Programs","BISTANDV"),
    e("9281","Housing Voucher Programs","BOSTBIDR"),e("9711","Nuclear Security","KARNSKV"),
    e("9211","Freedom of Information","OFFNTLVD"),e("9231","Redistricting Commissions","VALKRETSV"),
  ],
  DEFENSE: [
    e("3489","Armor Plating Manufacturing","PANSMVF"),e("5617","CBRN Defense","NBCFVF"),
    e("6116","Survival Training","OVERLVF"),
  ],
  REAL_ESTATE: [
    e("5311","Film Studio Lessors","FILMHR"),e("5313","Cost Segregation Studies","AVSKRRD"),
    e("5313","Highest and Best Use Studies","HOGSTRD"),e("5312","Tenant-in-Common Sales","TICMK"),
  ],
  UTILITIES: [
    e("2211","Waste Heat Recovery","SPILLVR"),e("2212","Transactive Energy","TRANSEL"),
    e("2221","Lead Service Line Replacement","BLYRRBYT"),e("2222","Greywater Systems","GRAVAT"),
    e("2211","Floating Solar Power","FLYTSOL"),e("2213","Hydrogen Blending","VATBLDN"),
  ],
  AGRICULTURE: [
    e("1111","Quinoa Farming","KVNOAF"),e("1112","Microgreens Production","MIKGRN"),
    e("1113","Date Palm Farming","DADLFM"),e("1114","Tissue Culture Production","VAVNDFM"),
    e("1119","Lavender Farming","LAVNDFM"),e("1125","Crab Farming","KRBTFM"),
    e("1129","Alpaca Fiber Production","ULLFM"),
  ],
  WHOLESALE: [
    e("4234","Diagnostic Equipment Wholesalers","DIAGHD"),e("4236","Battery Wholesalers","BATTHD"),
    e("4238","Warehouse Automation Equipment Wholesalers","AUTMHD"),e("4244","Plant-Based Food Wholesalers","VXTHD"),
    e("4249","Event Supply Wholesalers","EVNTHD"),e("4251","Liquidation Wholesalers","LIKVHD"),
  ],
  HOSPITALITY: [
    e("7211","Space Hotels","RYMDHTL"),e("7211","Floating Hotels","FLYTHTL"),
    e("7211","Airport Capsule Hotels","FLYGKPS"),e("7213","Farm Stays","GARDSTR"),
    e("7221","Cloud Kitchens","MOLNKR"),e("7222","Bubble Tea Shops","BBLTHR"),
    e("7224","Beer Gardens","OLTRDR"),e("7224","Sake Bars","RIKBRS"),
  ],
  ENTERTAINMENT: [
    e("7112","Drone Racing","DRONSP"),e("7112","Obstacle Course Racing","HNDRLSP"),
    e("7131","Indoor Skydiving","FRIFLSP"),e("7131","Surfing Wave Pools","VAGPOOL"),
    e("7139","Bubble Soccer","BUBLSP"),e("7139","Zorbing Centers","ZRBCNTR"),
    e("7141","Barre Studios","BARRESR"),e("7141","Spin Studios","SPINNSR"),
    e("5121","Interactive Theater","MEDDTTR"),e("5121","Audiobook Production","LIDBKPR"),
  ],
  MINING: [
    e("2122","Indium Mining","INDMBR"),e("2122","Gallium Mining","GALLBR"),
    e("2122","Bismuth Mining","BISMTBR"),e("2123","Wollastonite Mining","WOLLBR"),
    e("2131","Drone Survey Services, Mining","DRNSVBR"),
  ],
  ADMINISTRATIVE: [
    e("5611","Mailroom Management","POSTRVTJ"),e("5613","On-Demand Staffing","SNABBEM"),
    e("5614","Outbound Call Services","UTGRTJ"),e("5616","Canine Security Services","HUNDVK"),
    e("5617","HVAC Maintenance Services","KLIMTJ"),
  ],
  MANAGEMENT: [
    e("5511","Data Center Holdings","DATHLD"),e("5511","EV Charging Holdings","LADDHLD"),
    e("5512","Timber REITs as Holdings","SKOGRSTR"),
  ],
  NONPROFIT: [
    e("8133","Ocean Conservation Organizations","HAVSFRN"),e("8133","Food Justice Organizations","MATRTFRN"),
    e("8134","Urban Garden Organizations","STADGRDFRN"),
  ],
  PUBLIC_COMPANY: [
    e("5412","Material Weakness Remediation","SVAGHRMDBR"),e("5416","Board Evaluation Services","STYRDBEDMB"),
    e("5239","Regulation S-K Compliance","REGSKBRS"),e("5231","Social Bond Programs","SOCIALBNDPG"),
  ],
};

// Merge supplemental entries into ALL_INDUSTRIES
for (const config of ALL_INDUSTRIES) {
  const extra1 = SUPPLEMENTAL[config.industry];
  const extra2 = SUPPLEMENTAL_2[config.industry];
  if (extra1 || extra2) {
    config.subs = [...config.subs, ...(extra1 ?? []), ...(extra2 ?? [])];
  }
}

// The catalog is built once and cached
let _catalog: CatalogPosition[] | null = null;
let _byName: Map<string, CatalogPosition> | null = null;
let _byIndustry: Map<string, CatalogPosition[]> | null = null;
let _byNaics: Map<string, CatalogPosition[]> | null = null;

function buildCatalog(): CatalogPosition[] {
  if (_catalog) return _catalog;

  const positions: CatalogPosition[] = [];
  const usedNames = new Set<string>();
  let posNum = 1;

  for (const { industry, subs } of ALL_INDUSTRIES) {
    const root = INDUSTRY_ROOTS[industry] ?? "CITIZEN";
    const archetype = ARCHETYPE_PARENTS[industry] ?? "REGULIS";

    for (const sub of subs) {
      // Build unique name: ROOT-SUFFIX
      let name = `${root}-${sub.sfx}`;

      // Guarantee uniqueness — append numeric if collision
      if (usedNames.has(name)) {
        let counter = 2;
        while (usedNames.has(`${name}${counter}`)) counter++;
        name = `${name}${counter}`;
      }
      usedNames.add(name);

      positions.push({
        id: `pos-${String(posNum).padStart(4, "0")}`,
        citizenName: name,
        industry,
        subIndustry: sub.sub,
        naicsPrefix: sub.naics,
        domain: `${sub.sub} Compliance Intelligence`,
        archetypeParent: archetype,
      });
      posNum++;
    }
  }

  _catalog = positions;
  return positions;
}

function buildIndexes(): void {
  if (_byName) return;
  const catalog = buildCatalog();

  _byName = new Map();
  _byIndustry = new Map();
  _byNaics = new Map();

  for (const pos of catalog) {
    _byName.set(pos.citizenName, pos);

    if (!_byIndustry.has(pos.industry)) _byIndustry.set(pos.industry, []);
    _byIndustry.get(pos.industry)!.push(pos);

    if (!_byNaics.has(pos.naicsPrefix)) _byNaics.set(pos.naicsPrefix, []);
    _byNaics.get(pos.naicsPrefix)!.push(pos);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════════════════════

/** Return all 2,880 catalog positions */
export function getFullCatalog(): CatalogPosition[] {
  return buildCatalog();
}

/** Return positions for a single industry */
export function getByIndustry(industry: string): CatalogPosition[] {
  buildIndexes();
  return _byIndustry!.get(industry) ?? [];
}

/** Return positions matching a 4-digit NAICS prefix */
export function getByNaics(naicsPrefix: string): CatalogPosition[] {
  buildIndexes();
  return _byNaics!.get(naicsPrefix) ?? [];
}

/** Look up a single position by Citizen name */
export function getPosition(citizenName: string): CatalogPosition | null {
  buildIndexes();
  return _byName!.get(citizenName) ?? null;
}

/** Get catalog summary stats */
export function getCatalogStats(): {
  totalPositions: number;
  industries: number;
  byIndustry: Record<string, number>;
  uniqueNaicsCodes: number;
} {
  const catalog = buildCatalog();
  buildIndexes();

  const byInd: Record<string, number> = {};
  for (const [ind, positions] of _byIndustry!.entries()) {
    byInd[ind] = positions.length;
  }

  return {
    totalPositions: catalog.length,
    industries: _byIndustry!.size,
    byIndustry: byInd,
    uniqueNaicsCodes: _byNaics!.size,
  };
}

/** Find the catalog position for a given industry + optional sub_industry */
export function findPosition(industry: string, subIndustry?: string): CatalogPosition | null {
  const positions = getByIndustry(industry);
  if (!subIndustry) return positions[0] ?? null;

  // Try exact match first
  const exact = positions.find(p => p.subIndustry === subIndustry);
  if (exact) return exact;

  // Try partial match
  const lower = subIndustry.toLowerCase();
  return positions.find(p => p.subIndustry.toLowerCase().includes(lower)) ?? positions[0] ?? null;
}

/**
 * Seed all 2,880 catalog positions into D1.
 * Processes in batches of 100 to stay within Workers limits.
 */
export async function seedCatalog(db: D1Database): Promise<{ inserted: number; durationMs: number }> {
  const start = Date.now();
  const catalog = buildCatalog();

  // Create table if not exists
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS citizen_catalog_positions (
      id TEXT PRIMARY KEY,
      citizen_name TEXT NOT NULL UNIQUE,
      industry TEXT NOT NULL,
      sub_industry TEXT NOT NULL,
      naics_prefix TEXT NOT NULL,
      domain TEXT NOT NULL,
      archetype_parent TEXT NOT NULL,
      assembly_status TEXT DEFAULT 'VACANT',
      assigned_assembly_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `).run();

  // Create indexes
  await db.batch([
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ccp_industry ON citizen_catalog_positions(industry)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ccp_naics ON citizen_catalog_positions(naics_prefix)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ccp_status ON citizen_catalog_positions(assembly_status)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_ccp_name ON citizen_catalog_positions(citizen_name)"),
  ]);

  let inserted = 0;
  const BATCH_SIZE = 100;

  for (let i = 0; i < catalog.length; i += BATCH_SIZE) {
    const batch = catalog.slice(i, i + BATCH_SIZE);
    const stmts = batch.map(pos =>
      db.prepare(`
        INSERT OR IGNORE INTO citizen_catalog_positions
          (id, citizen_name, industry, sub_industry, naics_prefix, domain, archetype_parent)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
      `).bind(pos.id, pos.citizenName, pos.industry, pos.subIndustry, pos.naicsPrefix, pos.domain, pos.archetypeParent)
    );
    const results = await db.batch(stmts);
    for (const r of results) {
      if (r.success) inserted++;
    }
  }

  return { inserted, durationMs: Date.now() - start };
}
