import { sprintf } from "sprintf-js";
import { HttpError } from "../error";
import * as fetch from "../fetch"
import * as models from "../models";

export namespace contacts {
  const baseURL = sprintf("%s/contacts", "https://httpbin.org");

  export async function read(name: string): Promise<models.Contact>  {
    if (name == undefined || name.toString().trim() == "") {
      throw new HttpError(null, null, "invalid name")
    }
    var url = sprintf("%s/%s", baseURL, name);
    console.info("url", url)

    return await fetch.get<models.Contact>(url)
  }

  export async function list() {
    return await fetch.get<models.ContactsResp>(baseURL)
  }

  export async function add(name: string, body: models.Contact): Promise<models.Contact> {
    return update(name, body)
  }

  export async function update(name: string, body: models.Contact): Promise<models.Contact> {
    var url = sprintf("%s/%s", baseURL, name);
    return await fetch.post(url, body)
  }
}
