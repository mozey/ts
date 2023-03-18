import { client } from "./client";

export namespace index {
  export function read() {
    client.contacts.read("foo").then((contact) => {
      // Note the type on the variable that is passed in
      console.info("contact name", contact.name)
      setHttpbinResp("Read contact", contact)
    })
  }

  export function create() {
    client.contacts.add({name: "foo"}).then((contact) => {
      setHttpbinResp("Create contact", contact)
    })
  }

  export function update() {
    client.contacts.update({name: "foo"}).then((contact) => {
      setHttpbinResp("Update contact", contact)
    })
  }

  export function list() {
    client.contacts.list().then((contact) => {
      setHttpbinResp("List contacts", contact)
    })
  }

  function setHttpbinResp(example: string, resp: any) {
    let respJSON = JSON.stringify(resp, null, 4)

    // Clone
    let panel =
      document.getElementById("results-template") as HTMLTemplateElement
    let clone = panel.content.cloneNode(true) as HTMLDivElement

    // Append template
    let results = document.getElementById("results") as HTMLDivElement
    results.textContent = ""
    results.appendChild(clone)

    // Set template values...
    // Header
    let header = document.getElementById("header") as HTMLHeadElement
    header.innerText = example
    // Resp
    let respElem = document.getElementById("resp") as HTMLPreElement
    respElem.innerText = respJSON
  }
}
