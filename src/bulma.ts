/**
 * Bulma doesn't include any logic by default, 
 * this file adds interactivity
 */
export class Bulma {
  /**
   * See markup in www/themes/ts/layouts/partials/header.html
   * and "Javascript toggle" here
   * https://bulma.io/documentation/components/navbar
   */
  private static navbar() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target) as HTMLDivElement;

        // Toggle the "is-active" class on both 
        // the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

  // TODO Param to specify which components to init?
  static init() {
    Bulma.navbar()
  }
}
