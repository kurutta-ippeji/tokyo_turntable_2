import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content", "button"]

  connect() {
    console.log("About controller connected")
  }

  show(event) {
    event.preventDefault()
    this.contentTarget.classList.remove("hidden")
    this.buttonTarget.classList.add("active")
  }

  close() {
    this.contentTarget.classList.add("hidden")
    this.buttonTarget.classList.remove("active")
  }
}
