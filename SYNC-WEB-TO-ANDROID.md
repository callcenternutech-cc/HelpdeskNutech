# CCIT Android - Web Frontend Sync

Merged from the latest frontend web source.

Implemented from web:
- Multi-dashboard routes: Summary, Ticket, Project, Staff
- Dashboard analytics components and helpers
- Additional dashboard API methods
- Nested Dashboard submenu support in the Android sidebar
- Dashboard filter behavior updated to the latest web logic while preserving the Android 2x2 labeled layout

Preserved from Android:
- TicketModal camera/attachment logic
- Android bottom navigation and create-ticket FAB
- Existing Android index.css/mobile UI customizations
- API config and Capacitor-specific files
- Existing login and ticket/master/user screens

Do not copy the web .env files. Reuse the Android project's existing environment configuration.
