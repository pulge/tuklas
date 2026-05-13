# 1.0.0 (2026-05-12)


### Features

* add JSearch connector and implement job ingestion and formatting utilities ([69c6d3a](https://github.com/pulge/tuklas/commit/69c6d3a))
* implement Logo component and collapsible Sidebar navigation layout ([b256e27](https://github.com/pulge/tuklas/commit/b256e27))
* implement collapsable sidebar component with navigation links and theme toggle ([c83b80b](https://github.com/pulge/tuklas/commit/c83b80b))
* implement integrations management client and backend infrastructure for API keys and LLM service configuration ([dc87ec9](https://github.com/pulge/tuklas/commit/dc87ec9))
* initial OSS baseline from cloud fork ([517b9d0](https://github.com/pulge/tuklas/commit/517b9d0))

# 1.0.0 (2026-05-06)


### Features

* add account security settings and password reset functionality ([70faa04](https://github.com/pulge/tuklas-cloud/commit/70faa04af5d252c446ed78ac5ce9b5edd64850f2))
* add account security settings page with email and password update forms ([86bb635](https://github.com/pulge/tuklas-cloud/commit/86bb635ea6977e51d352f45e2ca4eecf93dd4b1b))
* add AccountSettings component for managing user email and password updates ([2ce11a6](https://github.com/pulge/tuklas-cloud/commit/2ce11a6e7a0669d256605d57f1dd067167a81cd6))
* add application details drawer, Gmail sync API route, and job queue components ([68d0a76](https://github.com/pulge/tuklas-cloud/commit/68d0a76977113f4cfe54105ab9aff62b2329247e))
* add ApplicationDetailsDrawer component for viewing and editing application status and notes ([005b948](https://github.com/pulge/tuklas-cloud/commit/005b948287b2a52e9414e996056eef53f7dd5446))
* add connector configuration guide and scaffolding for authentication and LLM integration ([d4679dd](https://github.com/pulge/tuklas-cloud/commit/d4679dde654074f83bc1135cf46e3c13d3fe74fe))
* add ConnectorGuide component for Gmail and Pub/Sub configuration setup ([b5692a8](https://github.com/pulge/tuklas-cloud/commit/b5692a8bb69362ef77fcfb98e4c506c503a91abb))
* add ConnectorGuide component for Gmail and Pub/Sub configuration setup ([be538d4](https://github.com/pulge/tuklas-cloud/commit/be538d4d39c5f50802dc3abe93f17ed461d769ab))
* add ConnectorGuide component for Google Cloud and email alert setup instructions ([d54d878](https://github.com/pulge/tuklas-cloud/commit/d54d8781519fa836d6e5ddceea14eae16d48a727))
* add ConnectorGuide component for Google Cloud and email ingestion setup ([ad814b3](https://github.com/pulge/tuklas-cloud/commit/ad814b3514ec3547be99c692fb24029b67720b2e))
* add ConnectorGuide component for setting up email ingestion via Google Cloud and Pub/Sub ([4340ea6](https://github.com/pulge/tuklas-cloud/commit/4340ea64b89aca2669793d9ebe6611a90e89c3b0))
* add dashboard setup and job queue management with manual entry and scraping capabilities ([4ff84f3](https://github.com/pulge/tuklas-cloud/commit/4ff84f3e8c1101ea7ed70126842b228568278bcd))
* add error handling, status pages, and job queue components with refresh functionality ([883703f](https://github.com/pulge/tuklas-cloud/commit/883703f57ea2d7359f9ddb1cc3d4a52d80a14e20))
* add forgot password page with email validation and submission feedback ([0eff8c6](https://github.com/pulge/tuklas-cloud/commit/0eff8c60d8d8ed2b6e64f00a400cee91f90ada80))
* add GitHub Actions workflow to sync UI changes to OSS repository ([221acbd](https://github.com/pulge/tuklas-cloud/commit/221acbdec4d46d74094f69a7eb4928be3ed2a00d))
* add Gmail API ingestion and sync routes for automated job alert processing ([6996047](https://github.com/pulge/tuklas-cloud/commit/69960471611d9311e8521a95e144b275be5c2807))
* add Gmail Pub/Sub webhook endpoint to fetch and parse job alert emails ([40a00fa](https://github.com/pulge/tuklas-cloud/commit/40a00fa40db34a78aaf160e8899a74b8211f946e))
* add IntegrationsClient component and supporting LLM configuration utilities ([a2b5cce](https://github.com/pulge/tuklas-cloud/commit/a2b5cce71446986ba844a38380e8568f2d075712))
* add IntegrationsClient component for managing API configurations and local LLM settings ([81a72b5](https://github.com/pulge/tuklas-cloud/commit/81a72b5908c8922617ff919db26639c1e4d788da))
* add job master-detail view with status-based management actions ([8354f57](https://github.com/pulge/tuklas-cloud/commit/8354f57ae74977e120efb579a59a07e498bd8bf8))
* add JobDetail component to handle job status actions and display descriptions ([0e4aff5](https://github.com/pulge/tuklas-cloud/commit/0e4aff5fa892911b613a98eb5be483af562351b3))
* add JobFilters component and define core Job types ([1b45b3c](https://github.com/pulge/tuklas-cloud/commit/1b45b3c817a4ac915d2b672c6880b63ec6a37da1))
* add JobList component to display list of job cards with selection support ([015561f](https://github.com/pulge/tuklas-cloud/commit/015561f9c1b00bb042bd5442c86c8c0d6dfc89f3))
* add JobsMasterDetail component for side-by-side job listing and preview viewing ([4318120](https://github.com/pulge/tuklas-cloud/commit/43181208094b07a201851f6799a2e0455325fafb))
* add LinkedIn connector and implement Gmail email ingestion API route ([0271d3f](https://github.com/pulge/tuklas-cloud/commit/0271d3f59c70511d6b3a326a10551ffe56980f04))
* add LLM abstraction layer for Ollama, Gemini, and OpenRouter integration ([95660ba](https://github.com/pulge/tuklas-cloud/commit/95660ba8b582753a8e7e6bc7fba0c48ce5597654))
* add LLM abstraction layer with provider support and server-side profile text processing actions ([8c641e6](https://github.com/pulge/tuklas-cloud/commit/8c641e682f5941ec5fd69be9c78672346e46119e))
* add Logo component with version display and navigation link ([051460e](https://github.com/pulge/tuklas-cloud/commit/051460e129e76b72c64cd30bedf3a8bced1ee916))
* add manual job submission, profile preferences, and application tracking forms with shared UI components ([3707cb6](https://github.com/pulge/tuklas-cloud/commit/3707cb653381703a44a330e869729fcb6d54fa41))
* add master-detail job view and application tracking components with management utilities ([3c82697](https://github.com/pulge/tuklas-cloud/commit/3c826973f76fbe21b02fd2443b4991a2619703c0))
* add PageHeader component for consistent page layouts ([ff43e22](https://github.com/pulge/tuklas-cloud/commit/ff43e22eeb30520b99d8f6875b1efcacd9692c18))
* add PreferencesForm component and standardize form architecture with react-hook-form and zod ([d2641ba](https://github.com/pulge/tuklas-cloud/commit/d2641bad2020f6a77e33f59059a22fdb457c7fab))
* add PreferencesForm component for managing profile criteria via hook-form and server actions ([87e772a](https://github.com/pulge/tuklas-cloud/commit/87e772af03f65999a025b3a7c2655e09490bb52b))
* add PreferencesForm component for managing profile settings ([bf1aef0](https://github.com/pulge/tuklas-cloud/commit/bf1aef05ee0940922b84ae4392d7ce649e3a217c))
* add PreferencesForm component for profile settings management ([2bcc016](https://github.com/pulge/tuklas-cloud/commit/2bcc01691b513ff852640f3e911911ea5131a130))
* add PreferencesForm component for profile settings management ([a3cdc66](https://github.com/pulge/tuklas-cloud/commit/a3cdc66b01320fdfc282326a911119550344bcad))
* add profile management server actions, application table component, and generic page header UI ([b03bcb4](https://github.com/pulge/tuklas-cloud/commit/b03bcb4130091f4776bf547f54ab1881390562d7))
* add ResumeManager component for PDF parsing, text extraction, and management ([371c600](https://github.com/pulge/tuklas-cloud/commit/371c6009f3c5b4dbc81f10047d3e3ba5d8c2bb3d))
* add ResumeManager component for PDF text extraction and AI content optimization ([9cfb0ae](https://github.com/pulge/tuklas-cloud/commit/9cfb0ae082bcfa77c5c75c42221845a505a48656))
* add reusable Skeleton components and PageHeaderProvider context for dynamic page header management ([2716ccd](https://github.com/pulge/tuklas-cloud/commit/2716ccd8c66b6f631f36a3768f94fe74b4c5e78b))
* add reusable Spinner component with configurable sizes ([27dc783](https://github.com/pulge/tuklas-cloud/commit/27dc78331d9f3a02a7e55e7b04a71c00c6b27523))
* add server actions and UI for AI model configuration management ([8871ba1](https://github.com/pulge/tuklas-cloud/commit/8871ba16e7b547fea5e123c6b00336a5964bdede))
* add server actions for updating profile CV and preferences ([05cc02e](https://github.com/pulge/tuklas-cloud/commit/05cc02ec1d524ee19affc98da672e96059a3a459))
* add server actions to update profile CV text and user preferences ([767b7c6](https://github.com/pulge/tuklas-cloud/commit/767b7c6b717a10dd90550e52a1ebff3419317283))
* add TruncatedTooltip component and implement automatic overflow detection in ApplicationTable, plus new error and not-found pages ([a67817b](https://github.com/pulge/tuklas-cloud/commit/a67817b3617bfce86a0f0e3ad291df342b82dc86))
* add UI components for resume management, application tracking, cover letter editing, integrations, and account settings ([4f3f83c](https://github.com/pulge/tuklas-cloud/commit/4f3f83c611863b8cc2ccf95422284f4f6c546251))
* add utility functions for date, salary, and string formatting ([b190cd2](https://github.com/pulge/tuklas-cloud/commit/b190cd2281813556fe089f965dae715010a07c7f))
* add workflow to sync UI changes to the OSS repository ([15a630a](https://github.com/pulge/tuklas-cloud/commit/15a630ab2673f85961a4a0d3fc5d97fb32204324))
* create auth code error page to handle expired or invalid verification links ([b541c8a](https://github.com/pulge/tuklas-cloud/commit/b541c8a3d36fcfde40ebac0652456ab93985a6c6))
* enable AI cover letter generation, standardize Server Action responses, and improve form validation architecture ([0e7957e](https://github.com/pulge/tuklas-cloud/commit/0e7957effd1be806ac0297105706eb36a8f79174))
* implement account security settings with email and password update forms ([58fcf65](https://github.com/pulge/tuklas-cloud/commit/58fcf650ce5c417335e180e082420dcbd1421e8b))
* implement account settings UI with email and password update functionality ([9a327fe](https://github.com/pulge/tuklas-cloud/commit/9a327fe48f8a5d689a52567f8ef8c679f18307da))
* implement AI provider configuration settings in user profile ([6eec0d8](https://github.com/pulge/tuklas-cloud/commit/6eec0d827fa9fec8071c3cfbecc039b1df2fe62f))
* implement AI-powered cover letter generation with interactive editor and tooltip components ([44fbc07](https://github.com/pulge/tuklas-cloud/commit/44fbc0707aaa70af90aedf4e91b35179aa018e54))
* implement application tracking interface with filtering, status management, and job types ([94b9f8d](https://github.com/pulge/tuklas-cloud/commit/94b9f8dcce324fe709e9d971a0cf668a14373539))
* implement application tracking interface with status filtering and mock data support ([effcaec](https://github.com/pulge/tuklas-cloud/commit/effcaec57797264ae263db1cbdcf7b01c7174500))
* implement application tracking table, job management interface, and sidebar layout components ([5676ba2](https://github.com/pulge/tuklas-cloud/commit/5676ba2bb31947db31eedaf62e5278630bf61555))
* implement ApplicationTable component with filtering and details management ([3f775e1](https://github.com/pulge/tuklas-cloud/commit/3f775e1b4c4dd0c5420a62784fb295081bb5cb2a))
* implement auth, job management, and user preferences ([0ed647e](https://github.com/pulge/tuklas-cloud/commit/0ed647e349c63c8d13aef139d21902d9dad69b9e))
* implement authentication layout and login/sign-up forms with validation ([b0b7449](https://github.com/pulge/tuklas-cloud/commit/b0b7449d5cc706f628a859704be3d75c47c4e94d))
* implement authentication layout and sign-up page with validation ([4035852](https://github.com/pulge/tuklas-cloud/commit/403585225fff923e399362714daee8afe7b1db12))
* implement authentication module with login and sign-up pages and server actions ([80e6814](https://github.com/pulge/tuklas-cloud/commit/80e6814e9e6315395c2d7f643c76c49bce812c46))
* implement authentication pages and manual job entry form components ([1d562e7](https://github.com/pulge/tuklas-cloud/commit/1d562e774014658a05f3141a565d732360de9021))
* implement authentication pages and reusable UI components including buttons and loading skeletons ([3af3dc8](https://github.com/pulge/tuklas-cloud/commit/3af3dc8919ba2a5ef2dfa259156192ea518b0c61))
* implement authentication pages, dashboard layout stubs, and utility components for form management and notifications ([9e3e3a6](https://github.com/pulge/tuklas-cloud/commit/9e3e3a6211d202b7145182ed4fbe68b0553ce6b8))
* implement authentication system with Supabase sign-up, login, and session management ([c91396e](https://github.com/pulge/tuklas-cloud/commit/c91396e9c65ac48c93d6983e544bafb8a06e42d7))
* implement connector interface, versioning system, and registry loader ([b4e828f](https://github.com/pulge/tuklas-cloud/commit/b4e828f465287d84f8ce7137122064662efdae07))
* implement ConnectorGuide component for Gmail and Pub/Sub integration setup ([32e6538](https://github.com/pulge/tuklas-cloud/commit/32e6538b3aae286345dfbb7c0c6e09ac29b8a070))
* implement core project structure, job management UI, and status tracking system ([3121a3f](https://github.com/pulge/tuklas-cloud/commit/3121a3ff6a01a5c24898fb3c0489dee25d6ca479))
* implement cover letter editor component, AI configuration form, and backend actions for profile management ([dc9bc98](https://github.com/pulge/tuklas-cloud/commit/dc9bc986ba39648ad966992142d7422a04eea14a))
* implement CoverLetterEditor component and integrate it into the job detail view ([e89db38](https://github.com/pulge/tuklas-cloud/commit/e89db38d1e8523d02dce7e69b7fcf3455d2ad7c5))
* implement dashboard applications page with server-side data fetching and loading states ([d090782](https://github.com/pulge/tuklas-cloud/commit/d09078204722c0d1214c3215bfede4b79b97ec08))
* implement dashboard layout and master-detail job view with reusable UI components ([53a9af3](https://github.com/pulge/tuklas-cloud/commit/53a9af3b5e817e2cc58f0ce9402e60bf6e472d20))
* implement dashboard layout and UI components for job tracking and application management pages. ([75b5ecd](https://github.com/pulge/tuklas-cloud/commit/75b5ecdec77d9a0d4ba7a92f37b4d9f3162355f8))
* implement dashboard pages for applications and jobs management ([b774460](https://github.com/pulge/tuklas-cloud/commit/b774460bcf9c1cb23dbc703004c621f0071d109b))
* implement dashboard pages for applications, jobs, and user profile with loading states ([b164f53](https://github.com/pulge/tuklas-cloud/commit/b164f536ae737c28c12752d3b2e5615511b2fe65))
* implement dashboard pages for applications, jobs, and user profile with status tracking and authentication ([544e096](https://github.com/pulge/tuklas-cloud/commit/544e0963583d3d41b5f91a65a3470e1ac52e43b4))
* implement dashboard pages for job management and user profile with UI components ([037d5b7](https://github.com/pulge/tuklas-cloud/commit/037d5b74b22744fd1fdab8fbe15d23be566d4f2a))
* implement data access layer and dashboard pages for jobs, applications, and profile management ([2c34779](https://github.com/pulge/tuklas-cloud/commit/2c34779f1b857c82e7657f8fb808e0e7099a132e))
* implement database schema for user integrations and document enterprise-grade security hardening measures ([1a72b6e](https://github.com/pulge/tuklas-cloud/commit/1a72b6ece3afff8a01c9e0b683b051ea34c39a2e))
* implement dynamic page header context and management system with updated dashboard components ([733b263](https://github.com/pulge/tuklas-cloud/commit/733b263caebe9152abbb86b4d50443c9e907d251))
* implement filtering, table management, and dashboard layout components for job tracking ([c3fb8fc](https://github.com/pulge/tuklas-cloud/commit/c3fb8fc94942fd08acd5cee877537d6a6008fa71))
* implement fully dynamic source and location filtering and introduce JobsQueue status monitoring component ([b5398f2](https://github.com/pulge/tuklas-cloud/commit/b5398f2ddfb07c733e4b3d4136bd8d2c82593da7))
* implement getAvailableModelsAction to fetch provider models from Ollama, Gemini, and OpenRouter ([053d07f](https://github.com/pulge/tuklas-cloud/commit/053d07f830ccc3b11a942b7488245f7e159d59a7))
* implement Gmail API ingestion route with Pub/Sub support and add connector configuration guide component ([8b69ccf](https://github.com/pulge/tuklas-cloud/commit/8b69ccf6998a1d301a952178dc31a1584a99b479))
* implement Gmail integration with manual sync endpoint and webhook-based Pub/Sub ingestion logic ([5f808ab](https://github.com/pulge/tuklas-cloud/commit/5f808ab134de6521abf3a15c8e00c812e1bbbc0d))
* implement Gmail job alert ingestion sync and integrate into JobsQueue UI ([22fc29f](https://github.com/pulge/tuklas-cloud/commit/22fc29fbfb424fe2a6c2152a2a72530032db040a))
* implement Gmail sync and JSearch ingestion endpoints with integrated UI management ([4f8db03](https://github.com/pulge/tuklas-cloud/commit/4f8db03e6f75e9ad5dcf3949338b94bc22ae8861))
* implement Gmail sync and JSearch scraping API routes with integration management UI ([3dea1bb](https://github.com/pulge/tuklas-cloud/commit/3dea1bbab3eb53dc94852bdc32528dd71be61ff9))
* implement integrations dashboard, AI config form, and master-detail job view while updating project architecture documentation. ([7f1212b](https://github.com/pulge/tuklas-cloud/commit/7f1212b6f8250b07a45930cbccc126f1dec038b0))
* implement IntegrationsClient component and rename middleware to proxy ([bf162f7](https://github.com/pulge/tuklas-cloud/commit/bf162f7678a63ab8ee94334b837a9dc78be3a9ca))
* implement job and application filtering components with master-detail views ([28b864a](https://github.com/pulge/tuklas-cloud/commit/28b864aec60585a635106e819fcae7b34db98ba9))
* implement job application management components with filtering and status updates ([20e280a](https://github.com/pulge/tuklas-cloud/commit/20e280a4f99754fd7343293e5f3b10413bd05cb5))
* implement job application management features with resume uploading, status tracking, and dashboard views ([10d1c77](https://github.com/pulge/tuklas-cloud/commit/10d1c77bf88b7e57f2e1e76c4cc1291967e92c00))
* implement job connectors, account settings, and profile management components ([b593d25](https://github.com/pulge/tuklas-cloud/commit/b593d25ed08e88a31d8c30b6716f2d07125ae537))
* implement job dashboard components and tailwind theme configuration ([71f3ae4](https://github.com/pulge/tuklas-cloud/commit/71f3ae46b8c69cab6c0b510c0e9dd0cff41e6e3a))
* implement job detail client and server action for cover letter generation ([ad9eebd](https://github.com/pulge/tuklas-cloud/commit/ad9eebdd69f23510c45875421d499c5bf939cb8b))
* implement job detail page and responsive master-detail dashboard interface ([c2642a6](https://github.com/pulge/tuklas-cloud/commit/c2642a61ea3d96a9bd3d5767a1969ee5ccf72ea9))
* implement job detail page with workspace layout, status actions, and UI components ([eb054b9](https://github.com/pulge/tuklas-cloud/commit/eb054b9e18b541514a8fcabab3b597af8e5ddb9e))
* implement job ingestion endpoints for Gmail and JSearch with rate limiting and initialize core Supabase schema ([52409d2](https://github.com/pulge/tuklas-cloud/commit/52409d2d0bd33a28e6584051b87b3b2e65d00cd0))
* implement job management interface and external integration settings ([91febdd](https://github.com/pulge/tuklas-cloud/commit/91febdd8d785b25c299959553ba345f8ba68faef))
* implement job management UI including cards, detail views, and backend ingestion sync routes ([0e2b064](https://github.com/pulge/tuklas-cloud/commit/0e2b0640789db0a808e058d88a73aac9de35af59))
* implement job master-detail view with dedicated job card and detail components ([8d30109](https://github.com/pulge/tuklas-cloud/commit/8d30109cca48fb2eaef875fbbbcc823498150442))
* implement job scraping infrastructure, database schema, and management UI ([f1b64b4](https://github.com/pulge/tuklas-cloud/commit/f1b64b44ee2bf9c7ff504f98cbe5108b6601a0c4))
* implement job scraping module with Indeed and Kalibrr connectors and queue UI ([e85a7ab](https://github.com/pulge/tuklas-cloud/commit/e85a7aba5c42b557ddf341399ab740473451b2cc))
* implement jobs queue management UI, system integration checklist, and API ingestion workflows ([862ce66](https://github.com/pulge/tuklas-cloud/commit/862ce6658ceb2622d15331d999df25735376e960))
* implement JobsMasterDetail component with responsive list and preview views ([0a580ca](https://github.com/pulge/tuklas-cloud/commit/0a580ca03a664608426f6cfc62a8130e2f3df1c0))
* implement JobsMasterDetail view and ApplicationTable with filtering and selection components ([1cab6c8](https://github.com/pulge/tuklas-cloud/commit/1cab6c80196bd9742d3d380b222432075095c1e7))
* implement JobsQueue component with refresh triggers and manual entry drawer ([f3e1b74](https://github.com/pulge/tuklas-cloud/commit/f3e1b747c3134d38e8db6c80a62960b44f436684))
* implement JSearch connector, job ingestion logic, and UI components for managing job listings ([7de5a35](https://github.com/pulge/tuklas-cloud/commit/7de5a35c65047e2c26f32501e283ba3f4da1bdfe))
* implement LLM abstraction layer and standardize form handling with ConfirmationDialog component ([5866b94](https://github.com/pulge/tuklas-cloud/commit/5866b9497c2ffdfa986270a598ab062aefec7eb2))
* implement LLM provider integration client and model discovery actions ([764ca40](https://github.com/pulge/tuklas-cloud/commit/764ca40d0aa6bb8bd93ea46a109a10f2d6642c73))
* implement LLM-powered cover letter generation and CV parsing workflows ([ea5abd5](https://github.com/pulge/tuklas-cloud/commit/ea5abd5d064508ed6e888d6a6ec87f2112768219))
* implement manual job entry form with Zod validation and server action support ([1f8c324](https://github.com/pulge/tuklas-cloud/commit/1f8c3243ac2b2034e7ca4fd66086a1df25d1d346))
* implement master-detail job management interface with detailed view and actions ([c67c7e5](https://github.com/pulge/tuklas-cloud/commit/c67c7e5acfde20eddf5ab1afe2234666ab418c3e))
* implement master-detail job management interface with queue view and setup checklist ([15a79da](https://github.com/pulge/tuklas-cloud/commit/15a79daf2e3cfa6f0f472392d21c23eb8363320f))
* implement master-detail view for job management with approve and skip actions ([b9e8940](https://github.com/pulge/tuklas-cloud/commit/b9e89403e52f5b62a9f34326096fe28486971e47))
* implement master-detail view for job management with status actions and filtering ([e5f7433](https://github.com/pulge/tuklas-cloud/commit/e5f74332fc23393ef6ba20950b0f53ce04cc48d5))
* implement modular job connector framework with Indeed, Kalibrr, and Jobstreet scraping integration and setup UI ([60301b7](https://github.com/pulge/tuklas-cloud/commit/60301b7a705acb66bde4bbf18b447f3c5023abb2))
* implement profile CV management actions, cover letter editor component, and base structure for integrations client ([f79c5fc](https://github.com/pulge/tuklas-cloud/commit/f79c5fc00ff48f562148779ff233892908d3f1b0))
* implement profile dashboard client and preferences configuration form ([786dd34](https://github.com/pulge/tuklas-cloud/commit/786dd3430a455937411cbe560dfb277912b65a85))
* implement profile management actions, application status table, and page header component ([7024f6d](https://github.com/pulge/tuklas-cloud/commit/7024f6dc8f71d7e9a2a81efb3593da49990a28bd))
* implement profile management dashboard with AI configuration and connector setup modules ([52c5a7c](https://github.com/pulge/tuklas-cloud/commit/52c5a7cf9df30b9c1c8c4c6bdd48798721b8f05d))
* implement provider-agnostic LLM abstraction layer supporting Ollama, Gemini, and OpenRouter ([1876d5c](https://github.com/pulge/tuklas-cloud/commit/1876d5c08933317b6507a58d0c584afa74779580))
* implement responsive dashboard layout with Sidebar, MobileTopBar, and BottomNav components ([6fd52f2](https://github.com/pulge/tuklas-cloud/commit/6fd52f2350fa0878a17faed727398a7e6b363a3e))
* implement responsive mobile-first navigation with bottom bar and top header components ([c3d6595](https://github.com/pulge/tuklas-cloud/commit/c3d659566a3cdf10923f4e45ef6df4795ef08280))
* implement responsive sidebar navigation with profile popover and authentication actions ([b799b6f](https://github.com/pulge/tuklas-cloud/commit/b799b6f265c9ec395f6b541f204dd69b754999c2))
* implement resume management system with PDF extraction and application tracking actions ([e028afc](https://github.com/pulge/tuklas-cloud/commit/e028afc912557061aba5a74677a745459a2ce5b0))
* implement resume PDF upload, text extraction, and AI-powered optimization features ([65fd0a0](https://github.com/pulge/tuklas-cloud/commit/65fd0a09ea667b1113366d5290f0a44406f5b3f6))
* implement ResumeManager component for PDF text extraction and AI-driven content optimization ([802fd72](https://github.com/pulge/tuklas-cloud/commit/802fd72d151d479234b4230afa94d91e118a0956))
* implement ResumeManager component for PDF upload, text extraction, and manual editing ([1417a9f](https://github.com/pulge/tuklas-cloud/commit/1417a9f5692c14e87ca7328f6ff06c2a57885b8f))
* implement ResumeManager component with PDF extraction and AI optimization actions ([e8b78bb](https://github.com/pulge/tuklas-cloud/commit/e8b78bb829b6e076a9a87e276df1aa744b9aaa19))
* implement server actions for job management and manual job creation ([5a53190](https://github.com/pulge/tuklas-cloud/commit/5a531905bc20cc53625e6f5f9b1e7ee36308766a))
* implement sidebar navigation and interactive application tracking table with status management actions ([45d5abd](https://github.com/pulge/tuklas-cloud/commit/45d5abdccf7b0ae3c63101eba78a8f1caa92f5ab))
* implement sign-up page with zod validation and password strength meter ([5abc047](https://github.com/pulge/tuklas-cloud/commit/5abc04785f60324bbc5dfca579c9370ade07340f))
* implement status badge component and add mock application data for tracking</div> ([d63cf1c](https://github.com/pulge/tuklas-cloud/commit/d63cf1c3496ef4323630637cbe8213c0d1278fd4))
* implement Supabase authentication, database schema, and job tracking dashboard UI ([7485be1](https://github.com/pulge/tuklas-cloud/commit/7485be118f6c41533300c740c82acc75ca3ef43d))
* implement Supabase session management and route protection middleware ([851e46b](https://github.com/pulge/tuklas-cloud/commit/851e46b5f74f2cf958b6bea33302bc998045f5ad))
* implement user profile dashboard with preference management, AI configuration, and account settings ([3bf7ca6](https://github.com/pulge/tuklas-cloud/commit/3bf7ca6c7f1bc9b61987aa54a2dae47d6d1c92df))
* implement user profile dashboard with resume management and settings components ([b1dd578](https://github.com/pulge/tuklas-cloud/commit/b1dd578db0b34fbc70ef11ef16870bfb5f31dd84))
* implement user sign-up page, password strength indicator, and account security settings components ([6408940](https://github.com/pulge/tuklas-cloud/commit/6408940fb1d4e108527a4754630489032142607d))
* initialize Tailwind CSS global styles and root layout configuration ([ca958f8](https://github.com/pulge/tuklas-cloud/commit/ca958f890b5610bb2f039611424c0813d33e06fd))
* initialize Tailwind CSS theme and design tokens in globals.css ([7bc30ce](https://github.com/pulge/tuklas-cloud/commit/7bc30ceb0be6beda198e29b77cfa4bff0851db49))
* scaffold job tracking dashboard components and profile management UI ([9e34efe](https://github.com/pulge/tuklas-cloud/commit/9e34efe47efaca2f61acf206704cd27ba4d1f576))
* split configuration and profile management by introducing dedicated /setup and /profile routes ([6f29cfd](https://github.com/pulge/tuklas-cloud/commit/6f29cfd4f8803ad0f7bbae50b33c25d43afc9432))
* update JobConnector interface with API versioning and optional scraping support ([7044f7a](https://github.com/pulge/tuklas-cloud/commit/7044f7a876dcea1ff207211b34b502e0288c38ff))
* update JobConnector interface, implement core ingestion logic, and activate multiple job connectors ([6152eb6](https://github.com/pulge/tuklas-cloud/commit/6152eb6fe85c730a1b2cf191f9b93730f5673aa2))

# [1.6.0](https://github.com/pulge/tuklas-cloud/compare/v1.5.0...v1.6.0) (2026-05-05)


### Features

* implement getAvailableModelsAction to fetch provider models from Ollama, Gemini, and OpenRouter ([053d07f](https://github.com/pulge/tuklas-cloud/commit/053d07f830ccc3b11a942b7488245f7e159d59a7))

# [1.5.0](https://github.com/pulge/tuklas-cloud/compare/v1.4.0...v1.5.0) (2026-05-05)


### Features

* add GitHub Actions workflow to sync UI changes to OSS repository ([221acbd](https://github.com/pulge/tuklas-cloud/commit/221acbdec4d46d74094f69a7eb4928be3ed2a00d))

# [1.4.0](https://github.com/pulge/tuklas-cloud/compare/v1.3.0...v1.4.0) (2026-05-05)


### Features

* add workflow to sync UI changes to the OSS repository ([15a630a](https://github.com/pulge/tuklas-cloud/commit/15a630ab2673f85961a4a0d3fc5d97fb32204324))

# [1.3.0](https://github.com/pulge/tuklas-cloud/compare/v1.2.0...v1.3.0) (2026-05-05)


### Features

* add profile management server actions, application table component, and generic page header UI ([b03bcb4](https://github.com/pulge/tuklas-cloud/commit/b03bcb4130091f4776bf547f54ab1881390562d7))
* implement profile management actions, application status table, and page header component ([7024f6d](https://github.com/pulge/tuklas-cloud/commit/7024f6dc8f71d7e9a2a81efb3593da49990a28bd))

# [1.2.0](https://github.com/pulge/tuklas-cloud/compare/v1.1.0...v1.2.0) (2026-05-05)


### Features

* add error handling, status pages, and job queue components with refresh functionality ([883703f](https://github.com/pulge/tuklas-cloud/commit/883703f57ea2d7359f9ddb1cc3d4a52d80a14e20))
* add TruncatedTooltip component and implement automatic overflow detection in ApplicationTable, plus new error and not-found pages ([a67817b](https://github.com/pulge/tuklas-cloud/commit/a67817b3617bfce86a0f0e3ad291df342b82dc86))
* implement job application management components with filtering and status updates ([20e280a](https://github.com/pulge/tuklas-cloud/commit/20e280a4f99754fd7343293e5f3b10413bd05cb5))

# [1.1.0](https://github.com/pulge/tuklas-cloud/compare/v1.0.0...v1.1.0) (2026-05-05)


### Features

* implement Gmail sync and JSearch ingestion endpoints with integrated UI management ([4f8db03](https://github.com/pulge/tuklas-cloud/commit/4f8db03e6f75e9ad5dcf3949338b94bc22ae8861))

# 1.0.0 (2026-05-05)


### Features

* add account security settings and password reset functionality ([70faa04](https://github.com/pulge/tuklas-cloud/commit/70faa04af5d252c446ed78ac5ce9b5edd64850f2))
* add account security settings page with email and password update forms ([86bb635](https://github.com/pulge/tuklas-cloud/commit/86bb635ea6977e51d352f45e2ca4eecf93dd4b1b))
* add AccountSettings component for managing user email and password updates ([2ce11a6](https://github.com/pulge/tuklas-cloud/commit/2ce11a6e7a0669d256605d57f1dd067167a81cd6))
* add application details drawer, Gmail sync API route, and job queue components ([68d0a76](https://github.com/pulge/tuklas-cloud/commit/68d0a76977113f4cfe54105ab9aff62b2329247e))
* add ApplicationDetailsDrawer component for viewing and editing application status and notes ([005b948](https://github.com/pulge/tuklas-cloud/commit/005b948287b2a52e9414e996056eef53f7dd5446))
* add connector configuration guide and scaffolding for authentication and LLM integration ([d4679dd](https://github.com/pulge/tuklas-cloud/commit/d4679dde654074f83bc1135cf46e3c13d3fe74fe))
* add ConnectorGuide component for Gmail and Pub/Sub configuration setup ([b5692a8](https://github.com/pulge/tuklas-cloud/commit/b5692a8bb69362ef77fcfb98e4c506c503a91abb))
* add ConnectorGuide component for Gmail and Pub/Sub configuration setup ([be538d4](https://github.com/pulge/tuklas-cloud/commit/be538d4d39c5f50802dc3abe93f17ed461d769ab))
* add ConnectorGuide component for Google Cloud and email alert setup instructions ([d54d878](https://github.com/pulge/tuklas-cloud/commit/d54d8781519fa836d6e5ddceea14eae16d48a727))
* add ConnectorGuide component for Google Cloud and email ingestion setup ([ad814b3](https://github.com/pulge/tuklas-cloud/commit/ad814b3514ec3547be99c692fb24029b67720b2e))
* add ConnectorGuide component for setting up email ingestion via Google Cloud and Pub/Sub ([4340ea6](https://github.com/pulge/tuklas-cloud/commit/4340ea64b89aca2669793d9ebe6611a90e89c3b0))
* add dashboard setup and job queue management with manual entry and scraping capabilities ([4ff84f3](https://github.com/pulge/tuklas-cloud/commit/4ff84f3e8c1101ea7ed70126842b228568278bcd))
* add forgot password page with email validation and submission feedback ([0eff8c6](https://github.com/pulge/tuklas-cloud/commit/0eff8c60d8d8ed2b6e64f00a400cee91f90ada80))
* add Gmail API ingestion and sync routes for automated job alert processing ([6996047](https://github.com/pulge/tuklas-cloud/commit/69960471611d9311e8521a95e144b275be5c2807))
* add Gmail Pub/Sub webhook endpoint to fetch and parse job alert emails ([40a00fa](https://github.com/pulge/tuklas-cloud/commit/40a00fa40db34a78aaf160e8899a74b8211f946e))
* add IntegrationsClient component and supporting LLM configuration utilities ([a2b5cce](https://github.com/pulge/tuklas-cloud/commit/a2b5cce71446986ba844a38380e8568f2d075712))
* add IntegrationsClient component for managing API configurations and local LLM settings ([81a72b5](https://github.com/pulge/tuklas-cloud/commit/81a72b5908c8922617ff919db26639c1e4d788da))
* add job master-detail view with status-based management actions ([8354f57](https://github.com/pulge/tuklas-cloud/commit/8354f57ae74977e120efb579a59a07e498bd8bf8))
* add JobDetail component to handle job status actions and display descriptions ([0e4aff5](https://github.com/pulge/tuklas-cloud/commit/0e4aff5fa892911b613a98eb5be483af562351b3))
* add JobFilters component and define core Job types ([1b45b3c](https://github.com/pulge/tuklas-cloud/commit/1b45b3c817a4ac915d2b672c6880b63ec6a37da1))
* add JobList component to display list of job cards with selection support ([015561f](https://github.com/pulge/tuklas-cloud/commit/015561f9c1b00bb042bd5442c86c8c0d6dfc89f3))
* add JobsMasterDetail component for side-by-side job listing and preview viewing ([4318120](https://github.com/pulge/tuklas-cloud/commit/43181208094b07a201851f6799a2e0455325fafb))
* add LinkedIn connector and implement Gmail email ingestion API route ([0271d3f](https://github.com/pulge/tuklas-cloud/commit/0271d3f59c70511d6b3a326a10551ffe56980f04))
* add LLM abstraction layer for Ollama, Gemini, and OpenRouter integration ([95660ba](https://github.com/pulge/tuklas-cloud/commit/95660ba8b582753a8e7e6bc7fba0c48ce5597654))
* add LLM abstraction layer with provider support and server-side profile text processing actions ([8c641e6](https://github.com/pulge/tuklas-cloud/commit/8c641e682f5941ec5fd69be9c78672346e46119e))
* add Logo component with version display and navigation link ([051460e](https://github.com/pulge/tuklas-cloud/commit/051460e129e76b72c64cd30bedf3a8bced1ee916))
* add manual job submission, profile preferences, and application tracking forms with shared UI components ([3707cb6](https://github.com/pulge/tuklas-cloud/commit/3707cb653381703a44a330e869729fcb6d54fa41))
* add master-detail job view and application tracking components with management utilities ([3c82697](https://github.com/pulge/tuklas-cloud/commit/3c826973f76fbe21b02fd2443b4991a2619703c0))
* add PageHeader component for consistent page layouts ([ff43e22](https://github.com/pulge/tuklas-cloud/commit/ff43e22eeb30520b99d8f6875b1efcacd9692c18))
* add PreferencesForm component and standardize form architecture with react-hook-form and zod ([d2641ba](https://github.com/pulge/tuklas-cloud/commit/d2641bad2020f6a77e33f59059a22fdb457c7fab))
* add PreferencesForm component for managing profile criteria via hook-form and server actions ([87e772a](https://github.com/pulge/tuklas-cloud/commit/87e772af03f65999a025b3a7c2655e09490bb52b))
* add PreferencesForm component for managing profile settings ([bf1aef0](https://github.com/pulge/tuklas-cloud/commit/bf1aef05ee0940922b84ae4392d7ce649e3a217c))
* add PreferencesForm component for profile settings management ([2bcc016](https://github.com/pulge/tuklas-cloud/commit/2bcc01691b513ff852640f3e911911ea5131a130))
* add PreferencesForm component for profile settings management ([a3cdc66](https://github.com/pulge/tuklas-cloud/commit/a3cdc66b01320fdfc282326a911119550344bcad))
* add ResumeManager component for PDF parsing, text extraction, and management ([371c600](https://github.com/pulge/tuklas-cloud/commit/371c6009f3c5b4dbc81f10047d3e3ba5d8c2bb3d))
* add ResumeManager component for PDF text extraction and AI content optimization ([9cfb0ae](https://github.com/pulge/tuklas-cloud/commit/9cfb0ae082bcfa77c5c75c42221845a505a48656))
* add reusable Skeleton components and PageHeaderProvider context for dynamic page header management ([2716ccd](https://github.com/pulge/tuklas-cloud/commit/2716ccd8c66b6f631f36a3768f94fe74b4c5e78b))
* add reusable Spinner component with configurable sizes ([27dc783](https://github.com/pulge/tuklas-cloud/commit/27dc78331d9f3a02a7e55e7b04a71c00c6b27523))
* add server actions and UI for AI model configuration management ([8871ba1](https://github.com/pulge/tuklas-cloud/commit/8871ba16e7b547fea5e123c6b00336a5964bdede))
* add server actions for updating profile CV and preferences ([05cc02e](https://github.com/pulge/tuklas-cloud/commit/05cc02ec1d524ee19affc98da672e96059a3a459))
* add server actions to update profile CV text and user preferences ([767b7c6](https://github.com/pulge/tuklas-cloud/commit/767b7c6b717a10dd90550e52a1ebff3419317283))
* add UI components for resume management, application tracking, cover letter editing, integrations, and account settings ([4f3f83c](https://github.com/pulge/tuklas-cloud/commit/4f3f83c611863b8cc2ccf95422284f4f6c546251))
* add utility functions for date, salary, and string formatting ([b190cd2](https://github.com/pulge/tuklas-cloud/commit/b190cd2281813556fe089f965dae715010a07c7f))
* create auth code error page to handle expired or invalid verification links ([b541c8a](https://github.com/pulge/tuklas-cloud/commit/b541c8a3d36fcfde40ebac0652456ab93985a6c6))
* enable AI cover letter generation, standardize Server Action responses, and improve form validation architecture ([0e7957e](https://github.com/pulge/tuklas-cloud/commit/0e7957effd1be806ac0297105706eb36a8f79174))
* implement account security settings with email and password update forms ([58fcf65](https://github.com/pulge/tuklas-cloud/commit/58fcf650ce5c417335e180e082420dcbd1421e8b))
* implement account settings UI with email and password update functionality ([9a327fe](https://github.com/pulge/tuklas-cloud/commit/9a327fe48f8a5d689a52567f8ef8c679f18307da))
* implement AI provider configuration settings in user profile ([6eec0d8](https://github.com/pulge/tuklas-cloud/commit/6eec0d827fa9fec8071c3cfbecc039b1df2fe62f))
* implement AI-powered cover letter generation with interactive editor and tooltip components ([44fbc07](https://github.com/pulge/tuklas-cloud/commit/44fbc0707aaa70af90aedf4e91b35179aa018e54))
* implement application tracking interface with filtering, status management, and job types ([94b9f8d](https://github.com/pulge/tuklas-cloud/commit/94b9f8dcce324fe709e9d971a0cf668a14373539))
* implement application tracking interface with status filtering and mock data support ([effcaec](https://github.com/pulge/tuklas-cloud/commit/effcaec57797264ae263db1cbdcf7b01c7174500))
* implement application tracking table, job management interface, and sidebar layout components ([5676ba2](https://github.com/pulge/tuklas-cloud/commit/5676ba2bb31947db31eedaf62e5278630bf61555))
* implement ApplicationTable component with filtering and details management ([3f775e1](https://github.com/pulge/tuklas-cloud/commit/3f775e1b4c4dd0c5420a62784fb295081bb5cb2a))
* implement auth, job management, and user preferences ([0ed647e](https://github.com/pulge/tuklas-cloud/commit/0ed647e349c63c8d13aef139d21902d9dad69b9e))
* implement authentication layout and login/sign-up forms with validation ([b0b7449](https://github.com/pulge/tuklas-cloud/commit/b0b7449d5cc706f628a859704be3d75c47c4e94d))
* implement authentication layout and sign-up page with validation ([4035852](https://github.com/pulge/tuklas-cloud/commit/403585225fff923e399362714daee8afe7b1db12))
* implement authentication module with login and sign-up pages and server actions ([80e6814](https://github.com/pulge/tuklas-cloud/commit/80e6814e9e6315395c2d7f643c76c49bce812c46))
* implement authentication pages and manual job entry form components ([1d562e7](https://github.com/pulge/tuklas-cloud/commit/1d562e774014658a05f3141a565d732360de9021))
* implement authentication pages and reusable UI components including buttons and loading skeletons ([3af3dc8](https://github.com/pulge/tuklas-cloud/commit/3af3dc8919ba2a5ef2dfa259156192ea518b0c61))
* implement authentication pages, dashboard layout stubs, and utility components for form management and notifications ([9e3e3a6](https://github.com/pulge/tuklas-cloud/commit/9e3e3a6211d202b7145182ed4fbe68b0553ce6b8))
* implement authentication system with Supabase sign-up, login, and session management ([c91396e](https://github.com/pulge/tuklas-cloud/commit/c91396e9c65ac48c93d6983e544bafb8a06e42d7))
* implement connector interface, versioning system, and registry loader ([b4e828f](https://github.com/pulge/tuklas-cloud/commit/b4e828f465287d84f8ce7137122064662efdae07))
* implement ConnectorGuide component for Gmail and Pub/Sub integration setup ([32e6538](https://github.com/pulge/tuklas-cloud/commit/32e6538b3aae286345dfbb7c0c6e09ac29b8a070))
* implement core project structure, job management UI, and status tracking system ([3121a3f](https://github.com/pulge/tuklas-cloud/commit/3121a3ff6a01a5c24898fb3c0489dee25d6ca479))
* implement cover letter editor component, AI configuration form, and backend actions for profile management ([dc9bc98](https://github.com/pulge/tuklas-cloud/commit/dc9bc986ba39648ad966992142d7422a04eea14a))
* implement CoverLetterEditor component and integrate it into the job detail view ([e89db38](https://github.com/pulge/tuklas-cloud/commit/e89db38d1e8523d02dce7e69b7fcf3455d2ad7c5))
* implement dashboard applications page with server-side data fetching and loading states ([d090782](https://github.com/pulge/tuklas-cloud/commit/d09078204722c0d1214c3215bfede4b79b97ec08))
* implement dashboard layout and master-detail job view with reusable UI components ([53a9af3](https://github.com/pulge/tuklas-cloud/commit/53a9af3b5e817e2cc58f0ce9402e60bf6e472d20))
* implement dashboard layout and UI components for job tracking and application management pages. ([75b5ecd](https://github.com/pulge/tuklas-cloud/commit/75b5ecdec77d9a0d4ba7a92f37b4d9f3162355f8))
* implement dashboard pages for applications and jobs management ([b774460](https://github.com/pulge/tuklas-cloud/commit/b774460bcf9c1cb23dbc703004c621f0071d109b))
* implement dashboard pages for applications, jobs, and user profile with loading states ([b164f53](https://github.com/pulge/tuklas-cloud/commit/b164f536ae737c28c12752d3b2e5615511b2fe65))
* implement dashboard pages for applications, jobs, and user profile with status tracking and authentication ([544e096](https://github.com/pulge/tuklas-cloud/commit/544e0963583d3d41b5f91a65a3470e1ac52e43b4))
* implement dashboard pages for job management and user profile with UI components ([037d5b7](https://github.com/pulge/tuklas-cloud/commit/037d5b74b22744fd1fdab8fbe15d23be566d4f2a))
* implement data access layer and dashboard pages for jobs, applications, and profile management ([2c34779](https://github.com/pulge/tuklas-cloud/commit/2c34779f1b857c82e7657f8fb808e0e7099a132e))
* implement database schema for user integrations and document enterprise-grade security hardening measures ([1a72b6e](https://github.com/pulge/tuklas-cloud/commit/1a72b6ece3afff8a01c9e0b683b051ea34c39a2e))
* implement dynamic page header context and management system with updated dashboard components ([733b263](https://github.com/pulge/tuklas-cloud/commit/733b263caebe9152abbb86b4d50443c9e907d251))
* implement filtering, table management, and dashboard layout components for job tracking ([c3fb8fc](https://github.com/pulge/tuklas-cloud/commit/c3fb8fc94942fd08acd5cee877537d6a6008fa71))
* implement fully dynamic source and location filtering and introduce JobsQueue status monitoring component ([b5398f2](https://github.com/pulge/tuklas-cloud/commit/b5398f2ddfb07c733e4b3d4136bd8d2c82593da7))
* implement Gmail API ingestion route with Pub/Sub support and add connector configuration guide component ([8b69ccf](https://github.com/pulge/tuklas-cloud/commit/8b69ccf6998a1d301a952178dc31a1584a99b479))
* implement Gmail integration with manual sync endpoint and webhook-based Pub/Sub ingestion logic ([5f808ab](https://github.com/pulge/tuklas-cloud/commit/5f808ab134de6521abf3a15c8e00c812e1bbbc0d))
* implement Gmail job alert ingestion sync and integrate into JobsQueue UI ([22fc29f](https://github.com/pulge/tuklas-cloud/commit/22fc29fbfb424fe2a6c2152a2a72530032db040a))
* implement Gmail sync and JSearch scraping API routes with integration management UI ([3dea1bb](https://github.com/pulge/tuklas-cloud/commit/3dea1bbab3eb53dc94852bdc32528dd71be61ff9))
* implement integrations dashboard, AI config form, and master-detail job view while updating project architecture documentation. ([7f1212b](https://github.com/pulge/tuklas-cloud/commit/7f1212b6f8250b07a45930cbccc126f1dec038b0))
* implement IntegrationsClient component and rename middleware to proxy ([bf162f7](https://github.com/pulge/tuklas-cloud/commit/bf162f7678a63ab8ee94334b837a9dc78be3a9ca))
* implement job and application filtering components with master-detail views ([28b864a](https://github.com/pulge/tuklas-cloud/commit/28b864aec60585a635106e819fcae7b34db98ba9))
* implement job application management features with resume uploading, status tracking, and dashboard views ([10d1c77](https://github.com/pulge/tuklas-cloud/commit/10d1c77bf88b7e57f2e1e76c4cc1291967e92c00))
* implement job connectors, account settings, and profile management components ([b593d25](https://github.com/pulge/tuklas-cloud/commit/b593d25ed08e88a31d8c30b6716f2d07125ae537))
* implement job dashboard components and tailwind theme configuration ([71f3ae4](https://github.com/pulge/tuklas-cloud/commit/71f3ae46b8c69cab6c0b510c0e9dd0cff41e6e3a))
* implement job detail client and server action for cover letter generation ([ad9eebd](https://github.com/pulge/tuklas-cloud/commit/ad9eebdd69f23510c45875421d499c5bf939cb8b))
* implement job detail page and responsive master-detail dashboard interface ([c2642a6](https://github.com/pulge/tuklas-cloud/commit/c2642a61ea3d96a9bd3d5767a1969ee5ccf72ea9))
* implement job detail page with workspace layout, status actions, and UI components ([eb054b9](https://github.com/pulge/tuklas-cloud/commit/eb054b9e18b541514a8fcabab3b597af8e5ddb9e))
* implement job ingestion endpoints for Gmail and JSearch with rate limiting and initialize core Supabase schema ([52409d2](https://github.com/pulge/tuklas-cloud/commit/52409d2d0bd33a28e6584051b87b3b2e65d00cd0))
* implement job management interface and external integration settings ([91febdd](https://github.com/pulge/tuklas-cloud/commit/91febdd8d785b25c299959553ba345f8ba68faef))
* implement job management UI including cards, detail views, and backend ingestion sync routes ([0e2b064](https://github.com/pulge/tuklas-cloud/commit/0e2b0640789db0a808e058d88a73aac9de35af59))
* implement job master-detail view with dedicated job card and detail components ([8d30109](https://github.com/pulge/tuklas-cloud/commit/8d30109cca48fb2eaef875fbbbcc823498150442))
* implement job scraping infrastructure, database schema, and management UI ([f1b64b4](https://github.com/pulge/tuklas-cloud/commit/f1b64b44ee2bf9c7ff504f98cbe5108b6601a0c4))
* implement job scraping module with Indeed and Kalibrr connectors and queue UI ([e85a7ab](https://github.com/pulge/tuklas-cloud/commit/e85a7aba5c42b557ddf341399ab740473451b2cc))
* implement jobs queue management UI, system integration checklist, and API ingestion workflows ([862ce66](https://github.com/pulge/tuklas-cloud/commit/862ce6658ceb2622d15331d999df25735376e960))
* implement JobsMasterDetail component with responsive list and preview views ([0a580ca](https://github.com/pulge/tuklas-cloud/commit/0a580ca03a664608426f6cfc62a8130e2f3df1c0))
* implement JobsMasterDetail view and ApplicationTable with filtering and selection components ([1cab6c8](https://github.com/pulge/tuklas-cloud/commit/1cab6c80196bd9742d3d380b222432075095c1e7))
* implement JobsQueue component with refresh triggers and manual entry drawer ([f3e1b74](https://github.com/pulge/tuklas-cloud/commit/f3e1b747c3134d38e8db6c80a62960b44f436684))
* implement JSearch connector, job ingestion logic, and UI components for managing job listings ([7de5a35](https://github.com/pulge/tuklas-cloud/commit/7de5a35c65047e2c26f32501e283ba3f4da1bdfe))
* implement LLM abstraction layer and standardize form handling with ConfirmationDialog component ([5866b94](https://github.com/pulge/tuklas-cloud/commit/5866b9497c2ffdfa986270a598ab062aefec7eb2))
* implement LLM provider integration client and model discovery actions ([764ca40](https://github.com/pulge/tuklas-cloud/commit/764ca40d0aa6bb8bd93ea46a109a10f2d6642c73))
* implement LLM-powered cover letter generation and CV parsing workflows ([ea5abd5](https://github.com/pulge/tuklas-cloud/commit/ea5abd5d064508ed6e888d6a6ec87f2112768219))
* implement manual job entry form with Zod validation and server action support ([1f8c324](https://github.com/pulge/tuklas-cloud/commit/1f8c3243ac2b2034e7ca4fd66086a1df25d1d346))
* implement master-detail job management interface with detailed view and actions ([c67c7e5](https://github.com/pulge/tuklas-cloud/commit/c67c7e5acfde20eddf5ab1afe2234666ab418c3e))
* implement master-detail job management interface with queue view and setup checklist ([15a79da](https://github.com/pulge/tuklas-cloud/commit/15a79daf2e3cfa6f0f472392d21c23eb8363320f))
* implement master-detail view for job management with approve and skip actions ([b9e8940](https://github.com/pulge/tuklas-cloud/commit/b9e89403e52f5b62a9f34326096fe28486971e47))
* implement master-detail view for job management with status actions and filtering ([e5f7433](https://github.com/pulge/tuklas-cloud/commit/e5f74332fc23393ef6ba20950b0f53ce04cc48d5))
* implement modular job connector framework with Indeed, Kalibrr, and Jobstreet scraping integration and setup UI ([60301b7](https://github.com/pulge/tuklas-cloud/commit/60301b7a705acb66bde4bbf18b447f3c5023abb2))
* implement profile CV management actions, cover letter editor component, and base structure for integrations client ([f79c5fc](https://github.com/pulge/tuklas-cloud/commit/f79c5fc00ff48f562148779ff233892908d3f1b0))
* implement profile dashboard client and preferences configuration form ([786dd34](https://github.com/pulge/tuklas-cloud/commit/786dd3430a455937411cbe560dfb277912b65a85))
* implement profile management dashboard with AI configuration and connector setup modules ([52c5a7c](https://github.com/pulge/tuklas-cloud/commit/52c5a7cf9df30b9c1c8c4c6bdd48798721b8f05d))
* implement provider-agnostic LLM abstraction layer supporting Ollama, Gemini, and OpenRouter ([1876d5c](https://github.com/pulge/tuklas-cloud/commit/1876d5c08933317b6507a58d0c584afa74779580))
* implement responsive dashboard layout with Sidebar, MobileTopBar, and BottomNav components ([6fd52f2](https://github.com/pulge/tuklas-cloud/commit/6fd52f2350fa0878a17faed727398a7e6b363a3e))
* implement responsive mobile-first navigation with bottom bar and top header components ([c3d6595](https://github.com/pulge/tuklas-cloud/commit/c3d659566a3cdf10923f4e45ef6df4795ef08280))
* implement responsive sidebar navigation with profile popover and authentication actions ([b799b6f](https://github.com/pulge/tuklas-cloud/commit/b799b6f265c9ec395f6b541f204dd69b754999c2))
* implement resume management system with PDF extraction and application tracking actions ([e028afc](https://github.com/pulge/tuklas-cloud/commit/e028afc912557061aba5a74677a745459a2ce5b0))
* implement resume PDF upload, text extraction, and AI-powered optimization features ([65fd0a0](https://github.com/pulge/tuklas-cloud/commit/65fd0a09ea667b1113366d5290f0a44406f5b3f6))
* implement ResumeManager component for PDF text extraction and AI-driven content optimization ([802fd72](https://github.com/pulge/tuklas-cloud/commit/802fd72d151d479234b4230afa94d91e118a0956))
* implement ResumeManager component for PDF upload, text extraction, and manual editing ([1417a9f](https://github.com/pulge/tuklas-cloud/commit/1417a9f5692c14e87ca7328f6ff06c2a57885b8f))
* implement ResumeManager component with PDF extraction and AI optimization actions ([e8b78bb](https://github.com/pulge/tuklas-cloud/commit/e8b78bb829b6e076a9a87e276df1aa744b9aaa19))
* implement server actions for job management and manual job creation ([5a53190](https://github.com/pulge/tuklas-cloud/commit/5a531905bc20cc53625e6f5f9b1e7ee36308766a))
* implement sidebar navigation and interactive application tracking table with status management actions ([45d5abd](https://github.com/pulge/tuklas-cloud/commit/45d5abdccf7b0ae3c63101eba78a8f1caa92f5ab))
* implement sign-up page with zod validation and password strength meter ([5abc047](https://github.com/pulge/tuklas-cloud/commit/5abc04785f60324bbc5dfca579c9370ade07340f))
* implement status badge component and add mock application data for tracking</div> ([d63cf1c](https://github.com/pulge/tuklas-cloud/commit/d63cf1c3496ef4323630637cbe8213c0d1278fd4))
* implement Supabase authentication, database schema, and job tracking dashboard UI ([7485be1](https://github.com/pulge/tuklas-cloud/commit/7485be118f6c41533300c740c82acc75ca3ef43d))
* implement Supabase session management and route protection middleware ([851e46b](https://github.com/pulge/tuklas-cloud/commit/851e46b5f74f2cf958b6bea33302bc998045f5ad))
* implement user profile dashboard with preference management, AI configuration, and account settings ([3bf7ca6](https://github.com/pulge/tuklas-cloud/commit/3bf7ca6c7f1bc9b61987aa54a2dae47d6d1c92df))
* implement user profile dashboard with resume management and settings components ([b1dd578](https://github.com/pulge/tuklas-cloud/commit/b1dd578db0b34fbc70ef11ef16870bfb5f31dd84))
* implement user sign-up page, password strength indicator, and account security settings components ([6408940](https://github.com/pulge/tuklas-cloud/commit/6408940fb1d4e108527a4754630489032142607d))
* initialize Tailwind CSS global styles and root layout configuration ([ca958f8](https://github.com/pulge/tuklas-cloud/commit/ca958f890b5610bb2f039611424c0813d33e06fd))
* initialize Tailwind CSS theme and design tokens in globals.css ([7bc30ce](https://github.com/pulge/tuklas-cloud/commit/7bc30ceb0be6beda198e29b77cfa4bff0851db49))
* scaffold job tracking dashboard components and profile management UI ([9e34efe](https://github.com/pulge/tuklas-cloud/commit/9e34efe47efaca2f61acf206704cd27ba4d1f576))
* split configuration and profile management by introducing dedicated /setup and /profile routes ([6f29cfd](https://github.com/pulge/tuklas-cloud/commit/6f29cfd4f8803ad0f7bbae50b33c25d43afc9432))
* update JobConnector interface with API versioning and optional scraping support ([7044f7a](https://github.com/pulge/tuklas-cloud/commit/7044f7a876dcea1ff207211b34b502e0288c38ff))
* update JobConnector interface, implement core ingestion logic, and activate multiple job connectors ([6152eb6](https://github.com/pulge/tuklas-cloud/commit/6152eb6fe85c730a1b2cf191f9b93730f5673aa2))

# [1.62.0](https://github.com/pulge/tuklas/compare/v1.61.0...v1.62.0) (2026-05-03)


### Features

* implement Supabase session management and route protection middleware ([851e46b](https://github.com/pulge/tuklas/commit/851e46b5f74f2cf958b6bea33302bc998045f5ad))

# [1.61.0](https://github.com/pulge/tuklas/compare/v1.60.0...v1.61.0) (2026-05-03)


### Features

* implement job dashboard components and tailwind theme configuration ([71f3ae4](https://github.com/pulge/tuklas/commit/71f3ae46b8c69cab6c0b510c0e9dd0cff41e6e3a))

# [1.60.0](https://github.com/pulge/tuklas/compare/v1.59.0...v1.60.0) (2026-05-03)


### Features

* implement database schema for user integrations and document enterprise-grade security hardening measures ([1a72b6e](https://github.com/pulge/tuklas/commit/1a72b6ece3afff8a01c9e0b683b051ea34c39a2e))

# [1.59.0](https://github.com/pulge/tuklas/compare/v1.58.0...v1.59.0) (2026-05-03)


### Features

* implement Gmail integration with manual sync endpoint and webhook-based Pub/Sub ingestion logic ([5f808ab](https://github.com/pulge/tuklas/commit/5f808ab134de6521abf3a15c8e00c812e1bbbc0d))

# [1.58.0](https://github.com/pulge/tuklas/compare/v1.57.0...v1.58.0) (2026-05-03)


### Features

* add LinkedIn connector and implement Gmail email ingestion API route ([0271d3f](https://github.com/pulge/tuklas/commit/0271d3f59c70511d6b3a326a10551ffe56980f04))

# [1.57.0](https://github.com/pulge/tuklas/compare/v1.56.0...v1.57.0) (2026-05-03)


### Features

* add AccountSettings component for managing user email and password updates ([2ce11a6](https://github.com/pulge/tuklas/commit/2ce11a6e7a0669d256605d57f1dd067167a81cd6))

# [1.56.0](https://github.com/pulge/tuklas/compare/v1.55.0...v1.56.0) (2026-05-03)


### Features

* add LLM abstraction layer with provider support and server-side profile text processing actions ([8c641e6](https://github.com/pulge/tuklas/commit/8c641e682f5941ec5fd69be9c78672346e46119e))

# [1.55.0](https://github.com/pulge/tuklas/compare/v1.54.0...v1.55.0) (2026-05-03)


### Features

* implement resume management system with PDF extraction and application tracking actions ([e028afc](https://github.com/pulge/tuklas/commit/e028afc912557061aba5a74677a745459a2ce5b0))

# [1.54.0](https://github.com/pulge/tuklas/compare/v1.53.0...v1.54.0) (2026-05-03)


### Features

* implement ResumeManager component for PDF upload, text extraction, and manual editing ([1417a9f](https://github.com/pulge/tuklas/commit/1417a9f5692c14e87ca7328f6ff06c2a57885b8f))

# [1.53.0](https://github.com/pulge/tuklas/compare/v1.52.0...v1.53.0) (2026-05-03)


### Features

* implement ResumeManager component with PDF extraction and AI optimization actions ([e8b78bb](https://github.com/pulge/tuklas/commit/e8b78bb829b6e076a9a87e276df1aa744b9aaa19))

# [1.52.0](https://github.com/pulge/tuklas/compare/v1.51.0...v1.52.0) (2026-05-03)


### Features

* add ResumeManager component for PDF parsing, text extraction, and management ([371c600](https://github.com/pulge/tuklas/commit/371c6009f3c5b4dbc81f10047d3e3ba5d8c2bb3d))

# [1.51.0](https://github.com/pulge/tuklas/compare/v1.50.0...v1.51.0) (2026-05-03)


### Features

* add ResumeManager component for PDF text extraction and AI content optimization ([9cfb0ae](https://github.com/pulge/tuklas/commit/9cfb0ae082bcfa77c5c75c42221845a505a48656))

# [1.50.0](https://github.com/pulge/tuklas/compare/v1.49.0...v1.50.0) (2026-05-03)


### Features

* implement LLM provider integration client and model discovery actions ([764ca40](https://github.com/pulge/tuklas/commit/764ca40d0aa6bb8bd93ea46a109a10f2d6642c73))

# [1.49.0](https://github.com/pulge/tuklas/compare/v1.48.0...v1.49.0) (2026-05-03)


### Features

* implement LLM abstraction layer and standardize form handling with ConfirmationDialog component ([5866b94](https://github.com/pulge/tuklas/commit/5866b9497c2ffdfa986270a598ab062aefec7eb2))

# [1.48.0](https://github.com/pulge/tuklas/compare/v1.47.0...v1.48.0) (2026-05-03)


### Features

* add IntegrationsClient component and supporting LLM configuration utilities ([a2b5cce](https://github.com/pulge/tuklas/commit/a2b5cce71446986ba844a38380e8568f2d075712))

# [1.47.0](https://github.com/pulge/tuklas/compare/v1.46.0...v1.47.0) (2026-05-03)


### Features

* implement ResumeManager component for PDF text extraction and AI-driven content optimization ([802fd72](https://github.com/pulge/tuklas/commit/802fd72d151d479234b4230afa94d91e118a0956))

# [1.46.0](https://github.com/pulge/tuklas/compare/v1.45.0...v1.46.0) (2026-05-03)


### Features

* implement profile CV management actions, cover letter editor component, and base structure for integrations client ([f79c5fc](https://github.com/pulge/tuklas/commit/f79c5fc00ff48f562148779ff233892908d3f1b0))

# [1.45.0](https://github.com/pulge/tuklas/compare/v1.44.0...v1.45.0) (2026-05-03)


### Features

* add server actions and UI for AI model configuration management ([8871ba1](https://github.com/pulge/tuklas/commit/8871ba16e7b547fea5e123c6b00336a5964bdede))

# [1.44.0](https://github.com/pulge/tuklas/compare/v1.43.0...v1.44.0) (2026-05-03)


### Features

* add UI components for resume management, application tracking, cover letter editing, integrations, and account settings ([4f3f83c](https://github.com/pulge/tuklas/commit/4f3f83c611863b8cc2ccf95422284f4f6c546251))

# [1.43.0](https://github.com/pulge/tuklas/compare/v1.42.0...v1.43.0) (2026-05-03)


### Features

* implement LLM-powered cover letter generation and CV parsing workflows ([ea5abd5](https://github.com/pulge/tuklas/commit/ea5abd5d064508ed6e888d6a6ec87f2112768219))

# [1.42.0](https://github.com/pulge/tuklas/compare/v1.41.0...v1.42.0) (2026-05-03)


### Features

* add LLM abstraction layer for Ollama, Gemini, and OpenRouter integration ([95660ba](https://github.com/pulge/tuklas/commit/95660ba8b582753a8e7e6bc7fba0c48ce5597654))

# [1.41.0](https://github.com/pulge/tuklas/compare/v1.40.0...v1.41.0) (2026-05-03)


### Features

* implement cover letter editor component, AI configuration form, and backend actions for profile management ([dc9bc98](https://github.com/pulge/tuklas/commit/dc9bc986ba39648ad966992142d7422a04eea14a))

# [1.40.0](https://github.com/pulge/tuklas/compare/v1.39.0...v1.40.0) (2026-05-03)


### Features

* implement resume PDF upload, text extraction, and AI-powered optimization features ([65fd0a0](https://github.com/pulge/tuklas/commit/65fd0a09ea667b1113366d5290f0a44406f5b3f6))

# [1.39.0](https://github.com/pulge/tuklas/compare/v1.38.0...v1.39.0) (2026-05-03)


### Features

* implement job management interface and external integration settings ([91febdd](https://github.com/pulge/tuklas/commit/91febdd8d785b25c299959553ba345f8ba68faef))

# [1.38.0](https://github.com/pulge/tuklas/compare/v1.37.0...v1.38.0) (2026-05-03)


### Features

* enable AI cover letter generation, standardize Server Action responses, and improve form validation architecture ([0e7957e](https://github.com/pulge/tuklas/commit/0e7957effd1be806ac0297105706eb36a8f79174))

# [1.37.0](https://github.com/pulge/tuklas/compare/v1.36.0...v1.37.0) (2026-05-03)


### Features

* implement job detail client and server action for cover letter generation ([ad9eebd](https://github.com/pulge/tuklas/commit/ad9eebdd69f23510c45875421d499c5bf939cb8b))

# [1.36.0](https://github.com/pulge/tuklas/compare/v1.35.0...v1.36.0) (2026-05-03)


### Features

* add JobList component to display list of job cards with selection support ([015561f](https://github.com/pulge/tuklas/commit/015561f9c1b00bb042bd5442c86c8c0d6dfc89f3))

# [1.35.0](https://github.com/pulge/tuklas/compare/v1.34.0...v1.35.0) (2026-05-03)


### Features

* implement CoverLetterEditor component and integrate it into the job detail view ([e89db38](https://github.com/pulge/tuklas/commit/e89db38d1e8523d02dce7e69b7fcf3455d2ad7c5))

# [1.34.0](https://github.com/pulge/tuklas/compare/v1.33.0...v1.34.0) (2026-05-03)


### Features

* implement AI-powered cover letter generation with interactive editor and tooltip components ([44fbc07](https://github.com/pulge/tuklas/commit/44fbc0707aaa70af90aedf4e91b35179aa018e54))

# [1.33.0](https://github.com/pulge/tuklas/compare/v1.32.0...v1.33.0) (2026-05-03)


### Features

* implement fully dynamic source and location filtering and introduce JobsQueue status monitoring component ([b5398f2](https://github.com/pulge/tuklas/commit/b5398f2ddfb07c733e4b3d4136bd8d2c82593da7))

# [1.32.0](https://github.com/pulge/tuklas/compare/v1.31.0...v1.32.0) (2026-05-03)


### Features

* implement filtering, table management, and dashboard layout components for job tracking ([c3fb8fc](https://github.com/pulge/tuklas/commit/c3fb8fc94942fd08acd5cee877537d6a6008fa71))

# [1.31.0](https://github.com/pulge/tuklas/compare/v1.30.0...v1.31.0) (2026-05-03)


### Features

* implement job management UI including cards, detail views, and backend ingestion sync routes ([0e2b064](https://github.com/pulge/tuklas/commit/0e2b0640789db0a808e058d88a73aac9de35af59))

# [1.30.0](https://github.com/pulge/tuklas/compare/v1.29.0...v1.30.0) (2026-05-03)


### Features

* implement job and application filtering components with master-detail views ([28b864a](https://github.com/pulge/tuklas/commit/28b864aec60585a635106e819fcae7b34db98ba9))

# [1.29.0](https://github.com/pulge/tuklas/compare/v1.28.0...v1.29.0) (2026-05-03)


### Features

* implement JobsQueue component with refresh triggers and manual entry drawer ([f3e1b74](https://github.com/pulge/tuklas/commit/f3e1b747c3134d38e8db6c80a62960b44f436684))

# [1.28.0](https://github.com/pulge/tuklas/compare/v1.27.0...v1.28.0) (2026-05-03)


### Features

* implement dashboard applications page with server-side data fetching and loading states ([d090782](https://github.com/pulge/tuklas/commit/d09078204722c0d1214c3215bfede4b79b97ec08))

# [1.27.0](https://github.com/pulge/tuklas/compare/v1.26.0...v1.27.0) (2026-05-03)


### Features

* implement server actions for job management and manual job creation ([5a53190](https://github.com/pulge/tuklas/commit/5a531905bc20cc53625e6f5f9b1e7ee36308766a))

# [1.26.0](https://github.com/pulge/tuklas/compare/v1.25.0...v1.26.0) (2026-05-03)


### Features

* implement job ingestion endpoints for Gmail and JSearch with rate limiting and initialize core Supabase schema ([52409d2](https://github.com/pulge/tuklas/commit/52409d2d0bd33a28e6584051b87b3b2e65d00cd0))

# [1.25.0](https://github.com/pulge/tuklas/compare/v1.24.0...v1.25.0) (2026-05-03)


### Features

* implement manual job entry form with Zod validation and server action support ([1f8c324](https://github.com/pulge/tuklas/commit/1f8c3243ac2b2034e7ca4fd66086a1df25d1d346))

# [1.24.0](https://github.com/pulge/tuklas/compare/v1.23.0...v1.24.0) (2026-05-03)


### Features

* implement job master-detail view with dedicated job card and detail components ([8d30109](https://github.com/pulge/tuklas/commit/8d30109cca48fb2eaef875fbbbcc823498150442))

# [1.23.0](https://github.com/pulge/tuklas/compare/v1.22.0...v1.23.0) (2026-05-03)


### Features

* add Logo component with version display and navigation link ([051460e](https://github.com/pulge/tuklas/commit/051460e129e76b72c64cd30bedf3a8bced1ee916))

# [1.22.0](https://github.com/pulge/tuklas/compare/v1.21.0...v1.22.0) (2026-05-03)


### Features

* implement Gmail job alert ingestion sync and integrate into JobsQueue UI ([22fc29f](https://github.com/pulge/tuklas/commit/22fc29fbfb424fe2a6c2152a2a72530032db040a))

# [1.21.0](https://github.com/pulge/tuklas/compare/v1.20.0...v1.21.0) (2026-05-03)


### Features

* implement JobsMasterDetail component with responsive list and preview views ([0a580ca](https://github.com/pulge/tuklas/commit/0a580ca03a664608426f6cfc62a8130e2f3df1c0))

# [1.20.0](https://github.com/pulge/tuklas/compare/v1.19.0...v1.20.0) (2026-05-03)


### Features

* implement JSearch connector, job ingestion logic, and UI components for managing job listings ([7de5a35](https://github.com/pulge/tuklas/commit/7de5a35c65047e2c26f32501e283ba3f4da1bdfe))

# [1.19.0](https://github.com/pulge/tuklas/compare/v1.18.0...v1.19.0) (2026-05-03)


### Features

* add utility functions for date, salary, and string formatting ([b190cd2](https://github.com/pulge/tuklas/commit/b190cd2281813556fe089f965dae715010a07c7f))
* implement master-detail view for job management with status actions and filtering ([e5f7433](https://github.com/pulge/tuklas/commit/e5f74332fc23393ef6ba20950b0f53ce04cc48d5))

# [1.18.0](https://github.com/pulge/tuklas/compare/v1.17.0...v1.18.0) (2026-05-03)


### Features

* add JobDetail component to handle job status actions and display descriptions ([0e4aff5](https://github.com/pulge/tuklas/commit/0e4aff5fa892911b613a98eb5be483af562351b3))

# [1.17.0](https://github.com/pulge/tuklas/compare/v1.16.0...v1.17.0) (2026-05-03)


### Features

* add ApplicationDetailsDrawer component for viewing and editing application status and notes ([005b948](https://github.com/pulge/tuklas/commit/005b948287b2a52e9414e996056eef53f7dd5446))

# [1.16.0](https://github.com/pulge/tuklas/compare/v1.15.0...v1.16.0) (2026-05-03)


### Features

* implement master-detail job management interface with detailed view and actions ([c67c7e5](https://github.com/pulge/tuklas/commit/c67c7e5acfde20eddf5ab1afe2234666ab418c3e))

# [1.15.0](https://github.com/pulge/tuklas/compare/v1.14.0...v1.15.0) (2026-05-03)


### Features

* add job master-detail view with status-based management actions ([8354f57](https://github.com/pulge/tuklas/commit/8354f57ae74977e120efb579a59a07e498bd8bf8))

# [1.14.0](https://github.com/pulge/tuklas/compare/v1.13.0...v1.14.0) (2026-05-03)


### Features

* add Gmail API ingestion and sync routes for automated job alert processing ([6996047](https://github.com/pulge/tuklas/commit/69960471611d9311e8521a95e144b275be5c2807))
* implement jobs queue management UI, system integration checklist, and API ingestion workflows ([862ce66](https://github.com/pulge/tuklas/commit/862ce6658ceb2622d15331d999df25735376e960))

# [1.13.0](https://github.com/pulge/tuklas/compare/v1.12.0...v1.13.0) (2026-05-03)


### Features

* add application details drawer, Gmail sync API route, and job queue components ([68d0a76](https://github.com/pulge/tuklas/commit/68d0a76977113f4cfe54105ab9aff62b2329247e))

# [1.12.0](https://github.com/pulge/tuklas/compare/v1.11.0...v1.12.0) (2026-05-03)


### Features

* implement job detail page with workspace layout, status actions, and UI components ([eb054b9](https://github.com/pulge/tuklas/commit/eb054b9e18b541514a8fcabab3b597af8e5ddb9e))

# [1.11.0](https://github.com/pulge/tuklas/compare/v1.10.0...v1.11.0) (2026-05-03)


### Features

* implement master-detail job management interface with queue view and setup checklist ([15a79da](https://github.com/pulge/tuklas/commit/15a79daf2e3cfa6f0f472392d21c23eb8363320f))

# [1.10.0](https://github.com/pulge/tuklas/compare/v1.9.0...v1.10.0) (2026-05-03)


### Features

* add account security settings and password reset functionality ([70faa04](https://github.com/pulge/tuklas/commit/70faa04af5d252c446ed78ac5ce9b5edd64850f2))

# [1.9.0](https://github.com/pulge/tuklas/compare/v1.8.0...v1.9.0) (2026-05-03)


### Features

* implement Gmail API ingestion route with Pub/Sub support and add connector configuration guide component ([8b69ccf](https://github.com/pulge/tuklas/commit/8b69ccf6998a1d301a952178dc31a1584a99b479))

# [1.8.0](https://github.com/pulge/tuklas/compare/v1.7.0...v1.8.0) (2026-05-03)


### Features

* add ConnectorGuide component for Gmail and Pub/Sub configuration setup ([b5692a8](https://github.com/pulge/tuklas/commit/b5692a8bb69362ef77fcfb98e4c506c503a91abb))
* implement ConnectorGuide component for Gmail and Pub/Sub integration setup ([32e6538](https://github.com/pulge/tuklas/commit/32e6538b3aae286345dfbb7c0c6e09ac29b8a070))

# [1.7.0](https://github.com/pulge/tuklas/compare/v1.6.0...v1.7.0) (2026-05-03)


### Features

* add ConnectorGuide component for Gmail and Pub/Sub configuration setup ([be538d4](https://github.com/pulge/tuklas/commit/be538d4d39c5f50802dc3abe93f17ed461d769ab))

# [1.6.0](https://github.com/pulge/tuklas/compare/v1.5.0...v1.6.0) (2026-05-03)


### Features

* add dashboard setup and job queue management with manual entry and scraping capabilities ([4ff84f3](https://github.com/pulge/tuklas/commit/4ff84f3e8c1101ea7ed70126842b228568278bcd))

# [1.5.0](https://github.com/pulge/tuklas/compare/v1.4.0...v1.5.0) (2026-05-03)


### Features

* update JobConnector interface, implement core ingestion logic, and activate multiple job connectors ([6152eb6](https://github.com/pulge/tuklas/commit/6152eb6fe85c730a1b2cf191f9b93730f5673aa2))

# [1.4.0](https://github.com/pulge/tuklas/compare/v1.3.0...v1.4.0) (2026-05-03)


### Features

* add Gmail Pub/Sub webhook endpoint to fetch and parse job alert emails ([40a00fa](https://github.com/pulge/tuklas/commit/40a00fa40db34a78aaf160e8899a74b8211f946e))

# [1.3.0](https://github.com/pulge/tuklas/compare/v1.2.0...v1.3.0) (2026-05-03)


### Features

* add IntegrationsClient component for managing API configurations and local LLM settings ([81a72b5](https://github.com/pulge/tuklas/commit/81a72b5908c8922617ff919db26639c1e4d788da))

# [1.2.0](https://github.com/pulge/tuklas/compare/v1.1.0...v1.2.0) (2026-05-03)


### Features

* implement modular job connector framework with Indeed, Kalibrr, and Jobstreet scraping integration and setup UI ([60301b7](https://github.com/pulge/tuklas/commit/60301b7a705acb66bde4bbf18b447f3c5023abb2))

# [1.1.0](https://github.com/pulge/tuklas/compare/v1.0.0...v1.1.0) (2026-05-03)


### Features

* add ConnectorGuide component for Google Cloud and email ingestion setup ([ad814b3](https://github.com/pulge/tuklas/commit/ad814b3514ec3547be99c692fb24029b67720b2e))

# 1.0.0 (2026-05-03)


### Features

* add account security settings page with email and password update forms ([86bb635](https://github.com/pulge/tuklas/commit/86bb635ea6977e51d352f45e2ca4eecf93dd4b1b))
* add connector configuration guide and scaffolding for authentication and LLM integration ([d4679dd](https://github.com/pulge/tuklas/commit/d4679dde654074f83bc1135cf46e3c13d3fe74fe))
* add ConnectorGuide component for Google Cloud and email alert setup instructions ([d54d878](https://github.com/pulge/tuklas/commit/d54d8781519fa836d6e5ddceea14eae16d48a727))
* add ConnectorGuide component for setting up email ingestion via Google Cloud and Pub/Sub ([4340ea6](https://github.com/pulge/tuklas/commit/4340ea64b89aca2669793d9ebe6611a90e89c3b0))
* add forgot password page with email validation and submission feedback ([0eff8c6](https://github.com/pulge/tuklas/commit/0eff8c60d8d8ed2b6e64f00a400cee91f90ada80))
* add JobFilters component and define core Job types ([1b45b3c](https://github.com/pulge/tuklas/commit/1b45b3c817a4ac915d2b672c6880b63ec6a37da1))
* add JobsMasterDetail component for side-by-side job listing and preview viewing ([4318120](https://github.com/pulge/tuklas/commit/43181208094b07a201851f6799a2e0455325fafb))
* add manual job submission, profile preferences, and application tracking forms with shared UI components ([3707cb6](https://github.com/pulge/tuklas/commit/3707cb653381703a44a330e869729fcb6d54fa41))
* add master-detail job view and application tracking components with management utilities ([3c82697](https://github.com/pulge/tuklas/commit/3c826973f76fbe21b02fd2443b4991a2619703c0))
* add PageHeader component for consistent page layouts ([ff43e22](https://github.com/pulge/tuklas/commit/ff43e22eeb30520b99d8f6875b1efcacd9692c18))
* add PreferencesForm component and standardize form architecture with react-hook-form and zod ([d2641ba](https://github.com/pulge/tuklas/commit/d2641bad2020f6a77e33f59059a22fdb457c7fab))
* add PreferencesForm component for managing profile criteria via hook-form and server actions ([87e772a](https://github.com/pulge/tuklas/commit/87e772af03f65999a025b3a7c2655e09490bb52b))
* add PreferencesForm component for managing profile settings ([bf1aef0](https://github.com/pulge/tuklas/commit/bf1aef05ee0940922b84ae4392d7ce649e3a217c))
* add PreferencesForm component for profile settings management ([2bcc016](https://github.com/pulge/tuklas/commit/2bcc01691b513ff852640f3e911911ea5131a130))
* add PreferencesForm component for profile settings management ([a3cdc66](https://github.com/pulge/tuklas/commit/a3cdc66b01320fdfc282326a911119550344bcad))
* add reusable Skeleton components and PageHeaderProvider context for dynamic page header management ([2716ccd](https://github.com/pulge/tuklas/commit/2716ccd8c66b6f631f36a3768f94fe74b4c5e78b))
* add reusable Spinner component with configurable sizes ([27dc783](https://github.com/pulge/tuklas/commit/27dc78331d9f3a02a7e55e7b04a71c00c6b27523))
* add server actions for updating profile CV and preferences ([05cc02e](https://github.com/pulge/tuklas/commit/05cc02ec1d524ee19affc98da672e96059a3a459))
* add server actions to update profile CV text and user preferences ([767b7c6](https://github.com/pulge/tuklas/commit/767b7c6b717a10dd90550e52a1ebff3419317283))
* create auth code error page to handle expired or invalid verification links ([b541c8a](https://github.com/pulge/tuklas/commit/b541c8a3d36fcfde40ebac0652456ab93985a6c6))
* implement account security settings with email and password update forms ([58fcf65](https://github.com/pulge/tuklas/commit/58fcf650ce5c417335e180e082420dcbd1421e8b))
* implement account settings UI with email and password update functionality ([9a327fe](https://github.com/pulge/tuklas/commit/9a327fe48f8a5d689a52567f8ef8c679f18307da))
* implement AI provider configuration settings in user profile ([6eec0d8](https://github.com/pulge/tuklas/commit/6eec0d827fa9fec8071c3cfbecc039b1df2fe62f))
* implement application tracking interface with filtering, status management, and job types ([94b9f8d](https://github.com/pulge/tuklas/commit/94b9f8dcce324fe709e9d971a0cf668a14373539))
* implement application tracking interface with status filtering and mock data support ([effcaec](https://github.com/pulge/tuklas/commit/effcaec57797264ae263db1cbdcf7b01c7174500))
* implement application tracking table, job management interface, and sidebar layout components ([5676ba2](https://github.com/pulge/tuklas/commit/5676ba2bb31947db31eedaf62e5278630bf61555))
* implement ApplicationTable component with filtering and details management ([3f775e1](https://github.com/pulge/tuklas/commit/3f775e1b4c4dd0c5420a62784fb295081bb5cb2a))
* implement auth, job management, and user preferences ([0ed647e](https://github.com/pulge/tuklas/commit/0ed647e349c63c8d13aef139d21902d9dad69b9e))
* implement authentication layout and login/sign-up forms with validation ([b0b7449](https://github.com/pulge/tuklas/commit/b0b7449d5cc706f628a859704be3d75c47c4e94d))
* implement authentication layout and sign-up page with validation ([4035852](https://github.com/pulge/tuklas/commit/403585225fff923e399362714daee8afe7b1db12))
* implement authentication module with login and sign-up pages and server actions ([80e6814](https://github.com/pulge/tuklas/commit/80e6814e9e6315395c2d7f643c76c49bce812c46))
* implement authentication pages and manual job entry form components ([1d562e7](https://github.com/pulge/tuklas/commit/1d562e774014658a05f3141a565d732360de9021))
* implement authentication pages and reusable UI components including buttons and loading skeletons ([3af3dc8](https://github.com/pulge/tuklas/commit/3af3dc8919ba2a5ef2dfa259156192ea518b0c61))
* implement authentication pages, dashboard layout stubs, and utility components for form management and notifications ([9e3e3a6](https://github.com/pulge/tuklas/commit/9e3e3a6211d202b7145182ed4fbe68b0553ce6b8))
* implement authentication system with Supabase sign-up, login, and session management ([c91396e](https://github.com/pulge/tuklas/commit/c91396e9c65ac48c93d6983e544bafb8a06e42d7))
* implement connector interface, versioning system, and registry loader ([b4e828f](https://github.com/pulge/tuklas/commit/b4e828f465287d84f8ce7137122064662efdae07))
* implement core project structure, job management UI, and status tracking system ([3121a3f](https://github.com/pulge/tuklas/commit/3121a3ff6a01a5c24898fb3c0489dee25d6ca479))
* implement dashboard layout and master-detail job view with reusable UI components ([53a9af3](https://github.com/pulge/tuklas/commit/53a9af3b5e817e2cc58f0ce9402e60bf6e472d20))
* implement dashboard layout and UI components for job tracking and application management pages. ([75b5ecd](https://github.com/pulge/tuklas/commit/75b5ecdec77d9a0d4ba7a92f37b4d9f3162355f8))
* implement dashboard pages for applications and jobs management ([b774460](https://github.com/pulge/tuklas/commit/b774460bcf9c1cb23dbc703004c621f0071d109b))
* implement dashboard pages for applications, jobs, and user profile with loading states ([b164f53](https://github.com/pulge/tuklas/commit/b164f536ae737c28c12752d3b2e5615511b2fe65))
* implement dashboard pages for applications, jobs, and user profile with status tracking and authentication ([544e096](https://github.com/pulge/tuklas/commit/544e0963583d3d41b5f91a65a3470e1ac52e43b4))
* implement dashboard pages for job management and user profile with UI components ([037d5b7](https://github.com/pulge/tuklas/commit/037d5b74b22744fd1fdab8fbe15d23be566d4f2a))
* implement data access layer and dashboard pages for jobs, applications, and profile management ([2c34779](https://github.com/pulge/tuklas/commit/2c34779f1b857c82e7657f8fb808e0e7099a132e))
* implement dynamic page header context and management system with updated dashboard components ([733b263](https://github.com/pulge/tuklas/commit/733b263caebe9152abbb86b4d50443c9e907d251))
* implement integrations dashboard, AI config form, and master-detail job view while updating project architecture documentation. ([7f1212b](https://github.com/pulge/tuklas/commit/7f1212b6f8250b07a45930cbccc126f1dec038b0))
* implement IntegrationsClient component and rename middleware to proxy ([bf162f7](https://github.com/pulge/tuklas/commit/bf162f7678a63ab8ee94334b837a9dc78be3a9ca))
* implement job application management features with resume uploading, status tracking, and dashboard views ([10d1c77](https://github.com/pulge/tuklas/commit/10d1c77bf88b7e57f2e1e76c4cc1291967e92c00))
* implement job connectors, account settings, and profile management components ([b593d25](https://github.com/pulge/tuklas/commit/b593d25ed08e88a31d8c30b6716f2d07125ae537))
* implement job detail page and responsive master-detail dashboard interface ([c2642a6](https://github.com/pulge/tuklas/commit/c2642a61ea3d96a9bd3d5767a1969ee5ccf72ea9))
* implement job scraping infrastructure, database schema, and management UI ([f1b64b4](https://github.com/pulge/tuklas/commit/f1b64b44ee2bf9c7ff504f98cbe5108b6601a0c4))
* implement job scraping module with Indeed and Kalibrr connectors and queue UI ([e85a7ab](https://github.com/pulge/tuklas/commit/e85a7aba5c42b557ddf341399ab740473451b2cc))
* implement JobsMasterDetail view and ApplicationTable with filtering and selection components ([1cab6c8](https://github.com/pulge/tuklas/commit/1cab6c80196bd9742d3d380b222432075095c1e7))
* implement master-detail view for job management with approve and skip actions ([b9e8940](https://github.com/pulge/tuklas/commit/b9e89403e52f5b62a9f34326096fe28486971e47))
* implement profile dashboard client and preferences configuration form ([786dd34](https://github.com/pulge/tuklas/commit/786dd3430a455937411cbe560dfb277912b65a85))
* implement profile management dashboard with AI configuration and connector setup modules ([52c5a7c](https://github.com/pulge/tuklas/commit/52c5a7cf9df30b9c1c8c4c6bdd48798721b8f05d))
* implement provider-agnostic LLM abstraction layer supporting Ollama, Gemini, and OpenRouter ([1876d5c](https://github.com/pulge/tuklas/commit/1876d5c08933317b6507a58d0c584afa74779580))
* implement responsive dashboard layout with Sidebar, MobileTopBar, and BottomNav components ([6fd52f2](https://github.com/pulge/tuklas/commit/6fd52f2350fa0878a17faed727398a7e6b363a3e))
* implement responsive mobile-first navigation with bottom bar and top header components ([c3d6595](https://github.com/pulge/tuklas/commit/c3d659566a3cdf10923f4e45ef6df4795ef08280))
* implement responsive sidebar navigation with profile popover and authentication actions ([b799b6f](https://github.com/pulge/tuklas/commit/b799b6f265c9ec395f6b541f204dd69b754999c2))
* implement sidebar navigation and interactive application tracking table with status management actions ([45d5abd](https://github.com/pulge/tuklas/commit/45d5abdccf7b0ae3c63101eba78a8f1caa92f5ab))
* implement sign-up page with zod validation and password strength meter ([5abc047](https://github.com/pulge/tuklas/commit/5abc04785f60324bbc5dfca579c9370ade07340f))
* implement status badge component and add mock application data for tracking</div> ([d63cf1c](https://github.com/pulge/tuklas/commit/d63cf1c3496ef4323630637cbe8213c0d1278fd4))
* implement Supabase authentication, database schema, and job tracking dashboard UI ([7485be1](https://github.com/pulge/tuklas/commit/7485be118f6c41533300c740c82acc75ca3ef43d))
* implement user profile dashboard with preference management, AI configuration, and account settings ([3bf7ca6](https://github.com/pulge/tuklas/commit/3bf7ca6c7f1bc9b61987aa54a2dae47d6d1c92df))
* implement user profile dashboard with resume management and settings components ([b1dd578](https://github.com/pulge/tuklas/commit/b1dd578db0b34fbc70ef11ef16870bfb5f31dd84))
* implement user sign-up page, password strength indicator, and account security settings components ([6408940](https://github.com/pulge/tuklas/commit/6408940fb1d4e108527a4754630489032142607d))
* initialize Tailwind CSS global styles and root layout configuration ([ca958f8](https://github.com/pulge/tuklas/commit/ca958f890b5610bb2f039611424c0813d33e06fd))
* initialize Tailwind CSS theme and design tokens in globals.css ([7bc30ce](https://github.com/pulge/tuklas/commit/7bc30ceb0be6beda198e29b77cfa4bff0851db49))
* scaffold job tracking dashboard components and profile management UI ([9e34efe](https://github.com/pulge/tuklas/commit/9e34efe47efaca2f61acf206704cd27ba4d1f576))
* split configuration and profile management by introducing dedicated /setup and /profile routes ([6f29cfd](https://github.com/pulge/tuklas/commit/6f29cfd4f8803ad0f7bbae50b33c25d43afc9432))
* update JobConnector interface with API versioning and optional scraping support ([7044f7a](https://github.com/pulge/tuklas/commit/7044f7a876dcea1ff207211b34b502e0288c38ff))
