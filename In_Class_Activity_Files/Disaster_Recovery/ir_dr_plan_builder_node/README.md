# IR/DR Plan Builder — Node.js Edition

A professional, web-based Incident Response and Disaster Recovery plan builder that runs on Mac, Windows, and Linux with zero GUI framework issues.

## Overview

This tool guides you through creating a comprehensive IR/DR plan in 6 steps:

1. **Welcome** — Introduction and quick start
2. **Organization Info** — Organization name, industry, and critical systems
3. **IR Team** — Build your incident response team with contact information
4. **IR Plan** — Define 5-stage incident response procedures with checklists
5. **DR Plan** — Define 4-stage disaster recovery procedures, RTO/RPO objectives
6. **Review** — Preview your complete plan and export as Markdown or PDF

## Technology Stack

- **Backend:** Node.js + Express.js
- **Frontend:** Vanilla JavaScript (no frameworks)
- **Styling:** CSS with Catppuccin Mocha dark theme
- **PDF Generation:** pdfkit
- **Auto-launch:** open package

## Requirements

- Node.js v18+ (tested with v24.11.1)
- npm v8+ (tested with v11.11.0)

## Installation

```bash
cd ir_dr_plan_builder_node
npm install
```

## Running the Application

```bash
npm start
# or
node server.js
```

The application will:
1. Start an Express server on `http://localhost:3000`
2. Automatically open your browser (if possible)
3. If the browser doesn't open automatically, visit `http://localhost:3000` manually

## Features

### 6-Step Wizard
- **Navigation Sidebar:** Quick jump to any step, visual progress bar
- **Data Persistence:** Save/load plans as JSON from your Downloads folder
- **Form Validation:** Required fields are checked before proceeding
- **Professional Styling:** Dark theme with Catppuccin Mocha color palette

### Step Details

#### Organization Info (Step 1)
- Organization name text input
- Industry dropdown (Healthcare, Finance, Education, Government, Technology, Retail, Manufacturing, Other)
- Critical systems multi-line textarea with "Add Systems" button to parse one per line
- Displayed as removable chips

#### IR Team (Step 2)
- Add team members with name, role, phone, email
- Display in styled HTML table
- Delete individual members with one click

#### IR Plan (Step 3)
- 5 tabs for each IR stage (Preparation, Detection & Analysis, Containment, Eradication, Recovery)
- Notes/description textarea for each stage
- Pre-populated checklists (editable, add/remove items)
- Check items off as you complete them

#### DR Plan (Step 4)
- 4 tabs for each DR stage (Prevention, Detection, Recovery, Post-Recovery)
- Notes/description textarea for each stage
- Pre-populated checklists (editable, add/remove items)
- RTO (Recovery Time Objective) and RPO (Recovery Point Objective) input fields

#### Review (Step 5)
- Completeness indicator (percentage of checklists checked + info fields filled)
- Full markdown preview of your plan
- Export to Markdown (.md) button
- Export to PDF button

### Data Management

**Save Plan**
- Click "Save Plan" button in sidebar
- Enter a filename (no extension)
- Plan is saved to your Downloads folder as JSON
- Can reload anytime using "Load Plan"

**Load Plan**
- Click "Load Plan" button in sidebar
- Select a previously saved JSON plan file
- Plan data is restored and you can continue editing

**Export Formats**
- **Markdown:** Professional .md file with tables, checklists, and sections
- **PDF:** Formatted PDF document suitable for printing or sharing

## Default Checklists

The tool comes pre-seeded with comprehensive default checklists for each IR and DR stage, based on industry best practices:

### IR Stages (5 stages)
1. **Preparation** — Tools, training, procedures
2. **Detection & Analysis** — Identify and assess incidents
3. **Containment** — Stop the attack
4. **Eradication** — Remove threats
5. **Recovery** — Restore systems

### DR Stages (4 stages)
1. **Prevention** — Redundancy and backups
2. **Detection** — Monitor for disasters
3. **Recovery** — Restore from backups
4. **Post-Recovery** — Return to normal ops

All checklists are fully editable — add, remove, or modify items as needed for your organization.

## API Endpoints

### `POST /api/save`
Save plan to disk
```json
{
  "filename": "my_plan",
  "plan": { /* plan object */ }
}
```

### `POST /api/export/markdown`
Generate and download Markdown file
```json
{ /* plan object */ }
```

### `POST /api/export/pdf`
Generate and download PDF file
```json
{ /* plan object */ }
```

### `GET *`
Serve static files and SPA

## File Structure

```
ir_dr_plan_builder_node/
├── server.js                  # Express server + API routes
├── package.json               # Dependencies
├── README.md                  # This file
└── public/
    ├── index.html             # SPA shell with all 6 pages
    ├── css/
    │   └── style.css          # Catppuccin Mocha theme
    └── js/
        ├── models.js          # Default plan data
        ├── app.js             # Router and state management
        └── pages/
            ├── welcome.js     # Page 0
            ├── org-info.js    # Page 1
            ├── ir-team.js     # Page 2
            ├── ir-plan.js     # Page 3
            ├── dr-plan.js     # Page 4
            └── review.js      # Page 5
```

## Cross-Platform Compatibility

- **macOS:** Native support via node/npm (Homebrew or direct download)
- **Windows:** Native support via Node installer or Chocolatey
- **Linux:** Native support via package managers or source builds
- **Browser:** Works in any modern browser (Chrome, Firefox, Safari, Edge)

No GUI framework = no platform-specific crashes or segfaults.

## Troubleshooting

### Port 3000 Already in Use
```bash
PORT=3001 npm start
```

### Browser Doesn't Open Automatically
Visit `http://localhost:3000` manually in your browser.

### Cannot Save Plans
Ensure you have write access to your Downloads folder.

## Development

The application uses:
- Vanilla JavaScript (no build step required)
- CSS custom properties for theming
- Event delegation for dynamic content
- Local in-memory state with browser file I/O

To modify:
1. Edit CSS in `public/css/style.css`
2. Edit page logic in `public/js/pages/`
3. Edit server routes in `server.js`
4. No build step needed — just refresh your browser

## License

MIT

## Credits

Based on the IR/DR reference document: `Incident_Response_and_Disaster_Recovery_Plan.md`
