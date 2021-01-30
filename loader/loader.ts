// Loading spinner with jQuery
// https://stackoverflow.com/a/68503/639133
// This is useful to prevent users from clicking buttons
// that make additional request while async code is executing, e.g.
// prevent clicking the save button twice
class Loader {
    constructor(selector: string) {
        let loader = $(selector).hide();
        $(document)
            .ajaxStart(function () {
                loader.show();
            })
            .ajaxStop(function () {
                loader.hide();
            });
    }
}
