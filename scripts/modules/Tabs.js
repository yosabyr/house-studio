export class Tabs {
  selectors = {
    root: '[data-js-tabs]',
    button: '[data-js-tabs-button]',
    panel: '[data-js-tabs-panel]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
    this.panelElements = this.rootElement.querySelectorAll(this.selectors.panel)
    this.bindEvents()
  }

  onRootClick = (event) => {
    const buttonElement = event.target.closest(this.selectors.button)
    const targetTabId = buttonElement.dataset.jsTabsButton

    this.buttonElements.forEach((button) => {
      const isActive = button === buttonElement
      button.classList.toggle(this.stateClasses.isActive, isActive)
      button.setAttribute('aria-selected', isActive)
      button.setAttribute('tabindex', isActive ? '0' : '-1')
    })

    this.panelElements.forEach((panel) => {
      const isActive = panel.dataset.jsTabsPanel === targetTabId
      panel.classList.toggle(this.stateClasses.isActive, isActive)
      panel.hidden = !isActive
    })
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.onRootClick)
  }
}
