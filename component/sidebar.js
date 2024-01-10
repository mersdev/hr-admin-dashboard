class Sidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div
      class="d-flex flex-column flex-shrink-0 p-3 border-end"
      style="width: 200px; height: 100vh"
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        previewlistener="true"
      >
        <div class="header d-flex justify-content-start">
          <img src="../asset/logo.png" alt="logo" width="45px" height="45px" />
          <div class="header-text mx-2">
            <p class="header-title fs-5 fw-bold my-0 py-0">Dashboard</p>
            <p class="text-muted my-0 py-0 mnt-1" style="font-size: 11px">
              Training Master List
            </p>
          </div>
        </div>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a
            href="/dashboard"
            class="nav-link link-dark d-flex aligns-item-center mb-2 side-dashboard"
            aria-current="page"
          >
            <ion-icon name="aperture-outline" class="fs-4 me-2"></ion-icon>
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="https://mersdev.github.io/hr-admin-dashboard/event"
            class="nav-link link-dark d-flex aligns-item-center mb-2 side-event"
          >
            <ion-icon name="calendar-outline" class="fs-4 me-2"></ion-icon
            >Events
          </a>
        </li>
        <li>
          <a
            href="https://mersdev.github.io/hr-admin-dashboard/employee"
            class="nav-link link-dark d-flex aligns-item-center mb-2 side-employee"
          >
            <ion-icon name="people-outline" class="fs-4 me-2"></ion-icon>
            Employees
          </a>
        </li>
        <li>
          <a
            href="/faq"
            class="nav-link link-dark d-flex aligns-item-center mb-2 side-faq"
          >
            <ion-icon name="help-circle-outline" class="fs-4 me-2"></ion-icon>
            FAQ
          </a>
        </li>
      </ul>
      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center link-dark text-decoration-none"
        >
          <img
            src="../asset/woman.png"
            alt=""
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
          Xiao Ying
          <button class="btn ms-auto d-flex aligns-item-center">
            <ion-icon name="log-out-outline" class="fs-4"></ion-icon>
          </button>
        </a>
      </div>
    </div>
    
    
    
    
    
    
    
    `;
  }
}

customElements.define("side-bar", Sidebar);
