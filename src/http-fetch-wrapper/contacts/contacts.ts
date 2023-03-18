import { sprintf } from "sprintf-js";
import { HttpError } from "../error";
import * as fetch from "../fetch"
import * as models from "../models";

export namespace contacts {
  const baseURL = sprintf("%s/contacts", "https://httpbin.org/anything");

  export async function read(name: string): Promise<models.Contact>  {
    if (name == undefined || name.toString().trim() == "") {
      throw new HttpError(null, null, "invalid name")
    }
    var url = sprintf("%s/%s", baseURL, name);
    // return await fetch.post<models.Contact>(url)
    return await fetch.post(url, <models.Contact>{
      name: name
    })
  }

  export async function list() {
    return await fetch.post(baseURL, <models.ContactsResp>{
      contacts: [
        {name: "foo"},
        {name: "bar"}
      ]
    })
  }

  export async function add(body: models.Contact): Promise<models.Contact> {
    return update(body)
  }

  export async function update(body: models.Contact): Promise<models.Contact> {
    var url = sprintf("%s/%s", baseURL, body.name);
    return await fetch.post(url, body)
  }
}
