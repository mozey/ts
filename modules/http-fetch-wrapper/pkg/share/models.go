package share

type Contact struct {
	Name    string `json:"name"`
}

type Contacts []Contact

// ContactsResp because it might be useful to add meta-data to the resp
type ContactsResp struct {
	Contacts Contacts `json:"contacts"`
}
