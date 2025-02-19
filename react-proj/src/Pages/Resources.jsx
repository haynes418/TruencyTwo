import React, { useState } from 'react';
import { Table } from "antd";
import { Collapse } from "antd";

function ResourcePage() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
        },
    ];

    const childCareDataSource =
        [
            {
                "key": 1,
                "name": "Center for Creative Child Care",
                "phoneNumber": "937-653-3322",
                "address": "238 N. Main Street, Urbana, OH 43078"
            },
            {
                "key": 2,
                "name": "Champaign Family YMCA",
                "phoneNumber": "937-653-9622",
                "address": "191 Community Drive, Urbana, OH 43078"
            },
            {
                "key": 3,
                "name": "Clever Cove Learning Center",
                "phoneNumber": "937-834-5132",
                "address": "62 Oakland St., Mechanicsburg, OH 43044"
            },
            {
                "key": 4,
                "name": "CORS/Head Start",
                "phoneNumber": "937-652-1742",
                "address": "1471 E. US Hwy. 36, Urbana, OH 43078"
            },
            {
                "key": 5,
                "name": "Little Strength Daycare",
                "phoneNumber": "937-484-4691",
                "address": "4194 W. US. Hwy. 36, Westville, OH 43078"
            },
            {
                "key": 6,
                "name": "Lulu’s Lullaby",
                "phoneNumber": "937-653-5858",
                "address": "1252 E. US Hwy. 36, Urbana, OH 43078"
            },
            {
                "key": 7,
                "name": "Theresa’s Gingerbread House",
                "phoneNumber": "937-653-8006",
                "address": "1202 N. Main Street, Urbana, OH 43078"
            },
            {
                "key": 8,
                "name": "Theresa’s Gingerbread Hse III",
                "phoneNumber": "937-650-8006",
                "address": "501 W. Baird St., West Liberty, OH 43357"
            },
            {
                "key": 9,
                "name": "With Love Childcare, LLC",
                "phoneNumber": "937-747-2530",
                "address": "20 E. Maple St., North Lewisburg, OH 43060"
            },
            {
                "key": 10,
                "name": "YMCA Cardinal Corner",
                "phoneNumber": "937-747-3447",
                "address": "124 E. Maple St., North Lewisburg, OH 43060"
            }
        ];

    const communityMealsDataSource =
        [
            {
                "key": 1,
                "name": "Caring Kitchen (Soup Kitchen)",
                "phoneNumber": "937-653-8443",
                "address": "300 Miami Street, Urbana, OH 43078",
                "desc": "Lunch M-F 11am-12:30pm, Carryout Dinner M-TH 6-7pm"
            },
            {
                "key": 2,
                "name": "Episcopal Church of Epiphany",
                "phoneNumber": "937-653-3497",
                "address": "230 Scioto Street, Urbana, OH 43078",
                "desc": "Free meal the 3rd Weds. of month, 5-6pm"
            },
            {
                "key": 3,
                "name": "Mechanicsburg Free Community Meal @ Episcopal Church of Our Savior",
                "phoneNumber": "",
                "address": "56 S. Main Street, Mechanicsburg, OH 43044",
                "desc": "Free meal the last Weds. of month"
            },
            {
                "key": 4,
                "name": "First Baptist Church",
                "phoneNumber": "937-663-4335",
                "address": "138 W. Plum Street, St. Paris, OH 43072",
                "desc": "Weekly on Wednesday, 6-7pm"
            },
            {
                "key": 5,
                "name": "North Lewisburg United Methodist Church",
                "phoneNumber": "937-747-2191",
                "address": "124 E. Maple St., North Lewisburg, OH 43060",
                "desc": "3rd Tuesday a month, 6pm"
            }
        ];

    const legalServiceDataSource =
        [
            {
                "key": 1,
                "name": "Champaign Co. Common Pleas Court",
                "phoneNumber": "937-484-1000",
                "address": "200 N. Main St., 2nd Floor, Urbana, OH 43078",
                "desc": "Judge Nick A. Selvaggio, Magistrate Scott Schockling"
            },
            {
                "key": 2,
                "name": "Champaign Co. Family & Probate Court",
                "phoneNumber": "937-484-1027",
                "address": "200 N. Main St., 3rd Floor, Urbana, OH 43078",
                "desc": "Judge Lori Reisinger and Judge Brett Gilbert, Magistrate Meghann Scott"
            },
            {
                "key": 3,
                "name": "Champaign County Municipal Court",
                "phoneNumber": "937-653-7376",
                "address": "205 S. Main St., Urbana, OH 43078",
                "desc": "Judge Gil Weithman"
            },
            {
                "key": 4,
                "name": "Legal Aid (Western Ohio)",
                "phoneNumber": "1-877-894-4599",
                "address": "",
                "desc": ""
            }
        ];

    const childAndFamiliesDataSource =
        [
            {
                "key": 1,
                "name": "Bridges Community Action Partnership",
                "phoneNumber": "937-772-9164",
                "address": "40 Monument Square Ste. 204, Urbana, OH",
                "desc": ""
            },
            {
                "key": 2,
                "name": "Car Seat Checks – Urbana Fire Division",
                "phoneNumber": "937-652-4374",
                "address": "200 S. Main St., Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 3,
                "name": "Champaign County Board of Developmental Disabilities",
                "phoneNumber": "937-653-5217",
                "address": "224 Patrick Avenue, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 4,
                "name": "Champaign County Child Support",
                "phoneNumber": "937-484-1500",
                "address": "1512 S US Hwy 68, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 5,
                "name": "Champaign County Dept. of Jobs & Family Services",
                "phoneNumber": "937-484-1500",
                "address": "1512 S US Hwy 68, Suite N100, Urbana, OH",
                "desc": ""
            },
            {
                "key": 6,
                "name": "Champaign County Early Intervention (Fka) Help Me Grow",
                "phoneNumber": "937-653-5217",
                "address": "224 Patrick Avenue, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 7,
                "name": "Champaign County Family & Children First Council",
                "phoneNumber": "937-653-4490",
                "address": "1512 S US Hwy 68, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 8,
                "name": "Champaign County Health District",
                "phoneNumber": "937-484-1605",
                "address": "1512 S US Hwy 68 Suite Q100, Urbana, OH",
                "desc": ""
            },
            {
                "key": 9,
                "name": "Dolly Parton’s Imagination Library",
                "phoneNumber": "937-324-5551",
                "address": "",
                "desc": "Free book mailed each month 0-5 years"
            },
            {
                "key": 10,
                "name": "Help Me Grow Home Visiting (prenatal-3)",
                "phoneNumber": "937-612-3322 or 1-800-755-GROW",
                "address": "",
                "desc": "Email: HMGreferrals@helpmegrow.org\nService provided by Greater Dayton Area Hospital Association"
            },
            {
                "key": 11,
                "name": "Madison-Champaign Educational Service Center",
                "phoneNumber": "937-484-1557",
                "address": "2200 S US Hwy 68, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 12,
                "name": "Ohio Means Jobs",
                "phoneNumber": "937-484-1581",
                "address": "1512 S US Hwy 68 J100, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 13,
                "name": "OSU Extension (4H)",
                "phoneNumber": "937-484-1526",
                "address": "1512 S US Hwy 68, B100, Urbana, OH",
                "desc": ""
            },
            {
                "key": 14,
                "name": "Safe Space Family Resource Center",
                "phoneNumber": "937-484-1039",
                "address": "",
                "desc": ""
            },
            {
                "key": 15,
                "name": "Sycamore House Pregnancy Center",
                "phoneNumber": "937-653-3737",
                "address": "647 Bodey Circle, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 16,
                "name": "United Way of Clark Madison & Champaign Counties",
                "phoneNumber": "937-324-5551",
                "address": "120 S. Center St., Springfield, OH 45502",
                "desc": ""
            },
            {
                "key": 17,
                "name": "WIC (Womens Infants Children)",
                "phoneNumber": "937-484-1668",
                "address": "1512 S US Hwy 68 Suite Q100, Urbana, OH",
                "desc": ""
            }
        ];


    const environmentalHealthServicesDataSource =
        [
            {
                "key": 1,
                "name": "Champaign Health District",
                "phoneNumber": "937-484-1605",
                "address": "1512 S. US Hwy 68 Q100 Urbana, OH 43078",
                "desc": ""
            },
        ];

    const clothingAssistanceDataSource =
        [
            {
                "key": 1,
                "name": "Caring Kitchen",
                "phoneNumber": "937-653-8443",
                "address": "300 Miami Street, Urbana, OH 43078",
                "desc": "Shopping M/W/F 11am-12pm; T/TH 4-5pm. Emergency requests accommodated outside of regular hours, please call ahead."
            },
            {
                "key": 2,
                "name": "Champaign County Department of Job & Family Services",
                "phoneNumber": "937-484-1500",
                "address": "",
                "desc": "PRC application required, school clothing, work essentials (steel-toed boots, etc.)"
            },
            {
                "key": 3,
                "name": "David’s Place",
                "phoneNumber": "937-209-9353",
                "address": "3 W. Sandusky St. Mechanicsburg, OH",
                "desc": ""
            },
            {
                "key": 4,
                "name": "Sycamore House",
                "phoneNumber": "937-653-3737",
                "address": "647 Bodey Circle, Urbana, OH 43078",
                "desc": "Clothing for infants & children in up to 6x"
            }
        ];


    const crisisAndSupportHotlinesDataSource =
        [
            {
                "key": 1,
                "name": "Child Abuse Reporting",
                "phoneNumber": "937-484-1500",
                "address": "1512 US Hwy. 68, N100, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 2,
                "name": "Coleman Mobile Response Stabilization",
                "phoneNumber": "1-888-418-6777",
                "address": "",
                "desc": ""
            },
            {
                "key": 3,
                "name": "Crisis Text Line",
                "phoneNumber": "",
                "address": "",
                "desc": "Text 4HOPE to 741741"
            },
            {
                "key": 4,
                "name": "Mental Health Emergency",
                "phoneNumber": "988",
                "address": "",
                "desc": ""
            },
            {
                "key": 5,
                "name": "National Alliance on Mental Illness",
                "phoneNumber": "1-800-950-NAMI (6264)",
                "address": "",
                "desc": "Text “helpline” to 62640"
            },
            {
                "key": 6,
                "name": "National Domestic Violence Hotline",
                "phoneNumber": "1-800-799-SAFE (7233)",
                "address": "",
                "desc": ""
            },
            {
                "key": 7,
                "name": "National Human Trafficking Hotline",
                "phoneNumber": "1-888-373-7888",
                "address": "",
                "desc": ""
            },
            {
                "key": 8,
                "name": "National Runaway Safeline",
                "phoneNumber": "1-800-RUNAWAY (786-2929)",
                "address": "",
                "desc": "Chat: 1800runaway.org"
            },
            {
                "key": 9,
                "name": "National Sexual Assault Hotline",
                "phoneNumber": "1-800-656-HOPE (4673)",
                "address": "",
                "desc": "Chat: hotline.rainn.org"
            },
            {
                "key": 10,
                "name": "National Suicide Prevention Hotline",
                "phoneNumber": "1-800-273-TALK (8255)",
                "address": "",
                "desc": "Chat: suicidepreventionlifeline.org"
            },
            {
                "key": 11,
                "name": "National Teen Dating Abuse Hotline",
                "phoneNumber": "1-866-331-9474",
                "address": "",
                "desc": "Chat: loveisrespect.org"
            },
            {
                "key": 12,
                "name": "Ohio Mobile (mental health) Crisis Unit",
                "phoneNumber": "1-888-418-MRSS (6777)",
                "address": "",
                "desc": ""
            },
            {
                "key": 13,
                "name": "SAMHSA National Helpline",
                "phoneNumber": "1-800-662-HELP (4357)",
                "address": "",
                "desc": ""
            },
            {
                "key": 14,
                "name": "Veteran Crisis Line",
                "phoneNumber": "988",
                "address": "",
                "desc": "Press 1 or text 838255; Chat: veteranscrisisline.net"
            }
        ];


    const identificationDataSource =
        [
            {
                "key": 1,
                "name": "Champaign Health District",
                "phoneNumber": "937-484-1605",
                "address": "1512 S. US Hwy. 68 Suite Q100, Urbana",
                "desc": "Birth and Death Certificates"
            },
            {
                "key": 2,
                "name": "Ohio Bureau of Motor Vehicles (Urbana)",
                "phoneNumber": "937-653-5996",
                "address": "1512 S US Hwy. 68, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 3,
                "name": "Social Security",
                "phoneNumber": "1-866-588-7397",
                "address": "20 S. Limestone St., Ste 220, Springfield",
                "desc": ""
            }
        ];


    const mentalHealthConselingDataSource =
        [
            {
                "key": 1,
                "name": "Catholic Charities",
                "phoneNumber": "1-866-635-9713",
                "address": "2nd Floor Mercy Hospital, 904 Scioto St., Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 2,
                "name": "Chrysalis Health",
                "phoneNumber": "1-800-691-6113",
                "address": "",
                "desc": "Website: www.chrysalishealthohio.com\nEmail: choreferrals@chrysalishealth.com"
            },
            {
                "key": 3,
                "name": "Coleman Mobile Response & Stabilization",
                "phoneNumber": "1-888-418-6777",
                "address": "",
                "desc": ""
            },
            {
                "key": 4,
                "name": "Community Health and Wellness Partners",
                "phoneNumber": "937-599-1411",
                "address": "605 Miami St., Ste. 100, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 5,
                "name": "Cornerstone Care Counseling Center",
                "phoneNumber": "937-935-3028",
                "address": "120 E. Townsend St., North Lewisburg, OH",
                "desc": ""
            },
            {
                "key": 6,
                "name": "Crisis Text Line",
                "phoneNumber": "",
                "address": "",
                "desc": "Text 4HOPE to 741741"
            },
            {
                "key": 7,
                "name": "Fowler Counseling & Consultation Services",
                "phoneNumber": "937-631-0257",
                "address": "40 Monument Sq., Ste. 301, Urbana, OH",
                "desc": ""
            },
            {
                "key": 8,
                "name": "Mary Rutan Behavioral Health",
                "phoneNumber": "937-887-0164",
                "address": "1880 E. US Hwy 36, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 9,
                "name": "Mental Health Emergency",
                "phoneNumber": "988",
                "address": "",
                "desc": ""
            },
            {
                "key": 10,
                "name": "New Directions of TCN (domestic violence)",
                "phoneNumber": "937-599-5777",
                "address": "1522 US Hwy 36, Ste. A, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 11,
                "name": "National Alliance on Mental Illness (NAMI)",
                "phoneNumber": "1-800-950-NAMI (6264)",
                "address": "",
                "desc": "Text 'helpline' to 62640"
            },
            {
                "key": 12,
                "name": "TCN Behavioral",
                "phoneNumber": "937-653-5583",
                "address": "1522 E US Hwy 36, Suite A, Urbana, OH",
                "desc": "Monday-Friday 8am-5pm"
            },
            {
                "key": 13,
                "name": "Urbana Family Physicians & Pediatrics",
                "phoneNumber": "937-653-3445",
                "address": "204 Patrick Avenue, Urbana, OH 43078",
                "desc": "Monday-Friday, 7am-5pm"
            },
            {
                "key": 14,
                "name": "WellSpring",
                "phoneNumber": "937-325-5564",
                "address": "701 E. Columbia St., Springfield, OH 45503",
                "desc": ""
            }
        ];


    const substanceAbuseDataSource =
        [
            {
                "key": 1,
                "name": "Mercy REACH",
                "phoneNumber": "937-653-3001",
                "address": "904 Scioto Street, Urbana (rear of hospital)",
                "desc": ""
            },
            {
                "key": 2,
                "name": "TCN Behavioral",
                "phoneNumber": "937-653-5583",
                "address": "1522 E US Hwy 36, Suite A, Urbana, OH",
                "desc": ""
            },
            {
                "key": 3,
                "name": "Recovery Zone",
                "phoneNumber": "937-508-4383",
                "address": "827 Scioto St., Urbana, OH 43078",
                "desc": "Monday 10-2pm, T-F 9am-3:30pm"
            }
        ];


    const foodAssistanceDataSource =
        [
            {
                "key": 1,
                "name": "Caring Kitchen",
                "phoneNumber": "937-653-8443",
                "address": "300 Miami St. Urbana, OH 43078",
                "desc": "Food boxes available M-F 10am-noon; please call for an appointment. Last minute emergencies can also call outside of normal hours."
            },
            {
                "key": 2,
                "name": "Concord Community Food Pantry",
                "phoneNumber": "937-284-2471",
                "address": "2963 OH-560, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 3,
                "name": "North Lewisburg United Methodist Church",
                "phoneNumber": "937-747-2191",
                "address": "124 E. Maple St. North Lewisburg, 43060",
                "desc": "2nd Sunday monthly from 3-5pm. Available to any Champaign Co. resident. Emergency food available by calling."
            },
            {
                "key": 4,
                "name": "Oasis of Mercy Food Pantry",
                "phoneNumber": "",
                "address": "40 Walnut St. Mechanicsburg, OH 43044",
                "desc": "Open 1st & 3rd Tues. of month, 3:30-5:30pm"
            },
            {
                "key": 5,
                "name": "Recovery Zone",
                "phoneNumber": "937-508-4383",
                "address": "827 Scioto St., Urbana, OH 43078",
                "desc": "Monday 10-2pm, T-F 9am-3:30pm. Emergency Food Boxes available (pick up)."
            },
            {
                "key": 6,
                "name": "Second Harvest Food Bank",
                "phoneNumber": "937-325-8715",
                "address": "20 N. Murray St., Springfield, OH 45503",
                "desc": "Website: https://www.theshfb.org/findfood"
            },
            {
                "key": 7,
                "name": "Stepping Stones",
                "phoneNumber": "937-652-1303",
                "address": "142 Delinger Rd., Urbana, OH 43078",
                "desc": "Pantry open 9am-noon Mon./Tues. Closed 3rd full week of the month."
            },
            {
                "key": 8,
                "name": "St. Paris Federation of Churches",
                "phoneNumber": "937-788-2480",
                "address": "135 W. Main Street, St. Paris, OH 43072",
                "desc": "Open to residents in and around St. Paris. 3rd Monday of the month, 4:15pm-5:15pm."
            },
            {
                "key": 9,
                "name": "The Wherehouse",
                "phoneNumber": "937-653-4892",
                "address": "110 W. Church Street, Urbana, OH 43078",
                "desc": "Open the 3rd Full Week of month. M-F 9am-noon; Tue. 6pm-7:30pm."
            },
            {
                "key": 10,
                "name": "South Union Mennonite Church/WL Cares",
                "phoneNumber": "937-465-6085",
                "address": "56 St. Rt. 508, West Liberty, OH 43357",
                "desc": "Serves West Liberty-Salem school district."
            },
            {
                "key": 11,
                "name": "Woodstock Community Church",
                "phoneNumber": "937-707-7179",
                "address": "206 W. Bennett St. Woodstock, OH 43084",
                "desc": ""
            }
        ];


    const lawEnforcementDataSource =
        [
            {
                "key": 1,
                "name": "Champaign County Sheriff’s Office",
                "phoneNumber": "937-652-1311",
                "address": "308 Miami St., Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 2,
                "name": "Mechanicsburg Police Department",
                "phoneNumber": "937-834-3303",
                "address": "18 N. Main St., Mechanicsburg, OH 43044",
                "desc": ""
            },
            {
                "key": 3,
                "name": "North Lewisburg Police Department",
                "phoneNumber": "937-653-3409",
                "address": "60 E. Maple St. North Lewisburg OH 43060",
                "desc": ""
            },
            {
                "key": 4,
                "name": "Saint Paris Police Department",
                "phoneNumber": "937-663-4468",
                "address": "137 W. Main St., St. Paris, OH 43072",
                "desc": ""
            },
            {
                "key": 5,
                "name": "Urbana Police Division",
                "phoneNumber": "937-652-4350",
                "address": "205 S. Main St., Urbana, OH 43078",
                "desc": ""
            }
        ];


    const sheltersDataSource =
        [
            {
                "key": 1,
                "name": "Caring Kitchen",
                "phoneNumber": "937-653-8443",
                "address": "300 Miami Street, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 2,
                "name": "Project Woman Domestic Violence Shelter",
                "phoneNumber": "937-328-5308",
                "address": "",
                "desc": ""
            },
            {
                "key": 3,
                "name": "Sorteria House Domestic Violence Shelter",
                "phoneNumber": "937-404-2365",
                "address": "",
                "desc": ""
            },
            {
                "key": 4,
                "name": "Safe Harbor House",
                "phoneNumber": "937-717-5908",
                "address": "PO Box 124, Springfield, OH 45501",
                "desc": ""
            }
        ];


    const transportationDataSource =
        [
            {
                "key": 1,
                "name": "Champaign Transit System",
                "phoneNumber": "937-653-8777",
                "address": "1512 S US Hwy, K 100, Urbana, OH 43078",
                "desc": ""
            },
            {
                "key": 2,
                "name": "David’s Place",
                "phoneNumber": "937-209-9353",
                "address": "3 W. Sandusky St. Mechanicsburg, OH 43044",
                "desc": ""
            },
            {
                "key": 3,
                "name": "Medicaid Managed Care Transportation",
                "phoneNumber": "",
                "address": "",
                "desc": "Aetna: 1-866-799-4395, Buckeye: 1-866-531-0615, CareSource: 1-800-488-0134, Molina: 1-866-642-9279, Paramount: 1-866-837-9817, United HealthCare: 1-800-269-4190"
            }
        ];


    const veteransDataSource =
        [
            {
                "key": 1,
                "name": "Champaign County Veterans Services",
                "phoneNumber": "937-653-4554",
                "address": "220 E. Court St., Urbana, OH 43078",
                "desc": ""
            },
        ];

    const urgentCareDataSource =
        [
            {
                "key": 1,
                "name": "Healing Hands Urgent Care, LLC",
                "phoneNumber": "937-508-4013",
                "address": "848 Scioto St. 2A, Urbana, OH 43078",
                "desc": "M-F 9am-9pm, Sat. 9am-7pm"
            },
            {
                "key": 2,
                "name": "Memorial Urgent Care Urbana",
                "phoneNumber": "937-652-5019",
                "address": "1958 E. US Hwy. 36, Urbana, OH 43078",
                "desc": "M-F 9am-9pm, Sat/Sun 9am-6pm"
            },
        ]


    const items = [
        {
            key: '1',
            label: 'CHILD CARE',
            children: <Table dataSource={childCareDataSource} columns={columns} />,
        },
        {
            key: '2',
            label: 'COMMUNITY MEALS',
            children: <Table dataSource={communityMealsDataSource} columns={columns} />,
        },
        {
            key: '3',
            label: 'COURT AND LEGAL SERVICES',
            children: <Table dataSource={legalServiceDataSource} columns={columns} />,
        },
        {
            key: '4',
            label: 'CHILDREN AND FAMILIES',
            children: <Table dataSource={childAndFamiliesDataSource} columns={columns} />,
        },
        {
            key: '5',
            label: 'ENVIRONMENTAL HEALTH SERVICES',
            children: <Table dataSource={environmentalHealthServicesDataSource} columns={columns} />,
        },
        {
            key: '6',
            label: 'CLOTHING ASSISTANCE',
            children: <Table dataSource={clothingAssistanceDataSource} columns={columns} />,
        },
        {
            key: '7',
            label: 'CRISIS & SUPPORT HOTLINES',
            children: <Table dataSource={crisisAndSupportHotlinesDataSource} columns={columns} />,
        },
        {
            key: '8',
            label: 'IDENTIFICATION',
            children: <Table dataSource={identificationDataSource} columns={columns} />,
        },
        {
            key: '9',
            label: 'MENTAL HEALTH/COUNSELING',
            children: <Table dataSource={mentalHealthConselingDataSource} columns={columns} />,
        },
        {
            key: '10',
            label: 'SUBSTANCE ABUSE',
            children: <Table dataSource={substanceAbuseDataSource} columns={columns} />,
        },
        {
            key: '11',
            label: 'FOOD ASSISTANCE',
            children: <Table dataSource={foodAssistanceDataSource} columns={columns} />,
        },
        {
            key: '12',
            label: 'LAW ENFORCEMENT',
            children: <Table dataSource={lawEnforcementDataSource} columns={columns} />,
        },
        {
            key: '13',
            label: 'SHELTERS',
            children: <Table dataSource={sheltersDataSource} columns={columns} />,
        },
        {
            key: '14',
            label: 'TRANSPORTATION',
            children: <Table dataSource={transportationDataSource} columns={columns} />,
        },
        {
            key: '15',
            label: 'VETERANS',
            children: <Table dataSource={veteransDataSource} columns={columns} />,
        },
        {
            key: '16',
            label: 'URGENT CARE',
            children: <Table dataSource={urgentCareDataSource} columns={columns} />,
        },

    ];

    return (
        <div className="screen">
            <h1>Resources</h1>
            <Collapse accordion items={items} />

        </div>
    );
}

export default ResourcePage;