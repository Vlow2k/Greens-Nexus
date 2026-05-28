import { Menu, Moon, Sun, Search, LogOut } from "lucide-react";
import { useMsal } from "@azure/msal-react";

export default function TopHeader({ title, theme, onThemeToggle, onMobileToggle }) {
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  function handleSignOut() {
    instance.logoutRedirect({
      account,
      postLogoutRedirectUri: window.location.origin + window.location.pathname,
    });
  }

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="mobile-toggle" onClick={onMobileToggle} aria-label="Toggle Sidebar">
          <Menu style={{ width: 18, height: 18 }} />
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-current">{title}</span>
        </div>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <Search style={{ width: 14, height: 14, flexShrink: 0 }} />
          <input placeholder="Search Nexus…" />
        </div>
      </div>

      <div className="header-right">
        <button className="icon-btn" onClick={onThemeToggle} aria-label="Toggle Theme">
          {theme === "dark"
            ? <Sun style={{ width: 16, height: 16 }} />
            : <Moon style={{ width: 16, height: 16 }} />
          }
        </button>
        <button className="icon-btn" onClick={handleSignOut} aria-label="Sign out" title="Sign out">
          <LogOut style={{ width: 16, height: 16 }} />
        </button>
      </div>
    </header>
  );
}
