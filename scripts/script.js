let shop = {
    buttonHtmlElement: [...document.querySelectorAll(`.menu__content--redesign`)],
    boxClassName: `.menu__content`,
    picClassName: `.menu__content-pic`,
    companyClassName: `.menu__content-company`,
    nameClassName: `.menu__content-title`,
    priceClassName: `.menu__content-price`,
    buttonClassName: `.menu__content--redesign`,
    formClassName: `.menu__content-form`,
    cardClassName:  `.card`, 
}

let items = {}

shop.buttonHtmlElement.forEach(i => {
    i.addEventListener(`click`, () => {
        const { boxClassName, picClassName, companyClassName, nameClassName, priceClassName, buttonClassName, formClassName } = shop;
        const mainBox = i.closest(boxClassName);
        const button = mainBox.querySelector(buttonClassName);
        const form = mainBox.querySelector(formClassName);
        const pic = mainBox.querySelector(picClassName);
        const company = mainBox.querySelector(companyClassName)
        const name = mainBox.querySelector(nameClassName)
        const price = mainBox.querySelector(priceClassName);
        button.innerHTML = `in the cart`;
        button.style.width = `85px`;
        let createLink = () => {
            form.action = `pages/card.html`
            button.type = `submit`;
        };
        setTimeout(createLink, 100);
        insertAdjacentHTML(`beforeend`, ``)
    });
});