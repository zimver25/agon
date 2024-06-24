window.onload = () => {
    const orderBox = document.querySelector(card.orderClassName)
    const mainBox = document.querySelector(card.cardClassName)
    if (localStorage.length !== 0) {
        for (const key in localStorage.valueOf()) {
            if (key === 'length') { break }
            const form = [...document.querySelectorAll(shop.formClassName)];
            const cardHtml = document.querySelector(card.cardClassName);
            const product = document.querySelector(card.productClassName);
            const totalPrice = document.querySelector(card.totalClassName);
            if (form.length !== 0) {
                form[localStorage.getItem(key)[0]].action = `pages/card.html`
                shop.buttonHtmlElement[localStorage.getItem(key)[0]].type = `submit`;
                shop.buttonHtmlElement[localStorage.getItem(key)[0]].innerHTML = `in the cart`;
                shop.buttonHtmlElement[localStorage.getItem(key)[0]].style.width = `85px`;
            };
            if (document.querySelector(card.cardClassName) !== null) {
                cardHtml.insertAdjacentHTML('beforeend', `<div class="card__content d-flex">
    <div class="card__left">
    <div class="card__left-container">
        <img src="../${filterLocStorage(localStorage.getItem(key), 1)}" alt="" class="card__left-pic">
        </div>
        <div class="card__left-box">
            <h2 class="card__left-title">${filterLocStorage(localStorage.getItem(key), 3)}</h2>
            <p class="card__left-desc">${filterLocStorage(localStorage.getItem(key), 2)}</p>
            <div class="card__left-button-box d-flex"><button
                    class="button card__left-button-minus" type="button"></button><p class="card__left-count">${filterLocStorage(localStorage.getItem(key), 5).split('').filter((num) => num in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).join('')}</p><button class="button card__left-button-plus" type="button"></button>
            </div>
        </div>
    </div>
    <div class="card__right">
        <p class="card__right-price">$${(Number(filterLocStorage(localStorage.getItem(key), 4).replace(`$`, ``)) * Number(filterLocStorage(localStorage.getItem(key), 5).split('').filter((num) => num in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).join(''))).toFixed(2)}</p>
        <button class="button card__right-button" type="button"><img src="../vectors/trash.svg"
                alt=""></button>
        <p class="card__content-index">${filterLocStorage(localStorage.getItem(key), 0)}</p>
    </div>
    </div>`);
                product.innerHTML = localStorage.length
                totalPrice.innerHTML = `$${(Number(totalPrice.innerHTML.replace(`$`, ``)) + Number(filterLocStorage(localStorage.getItem(key), 4).replace(`$`, ``)) * Number(filterLocStorage(localStorage.getItem(key), 5).split('').filter((num) => num in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).join(''))).toFixed(1)}`
            };
        };
    }
    else {
        orderBox.style.display = `none`
        mainBox.style = `grid-column: 1 / 4`
        mainBox.insertAdjacentHTML('beforeend', `<div class="card-no-item">
        <h2 class="title no-item__title">Card is empty</h2>
    </div>`)
    };
};

let shop = {
    boxClassName: `.menu__content`,
    picClassName: `.menu__content-pic`,
    companyClassName: `.menu__content-company`,
    nameClassName: `.menu__content-title`,
    priceClassName: `.menu__content-price`,
    buttonClassName: `.menu__content--redesign`,
    formClassName: `.menu__content-form`,
    buttonHtmlElement: [...document.querySelectorAll(`.menu__content--redesign`)],
    boxHtmlElement: [...document.querySelectorAll(`.menu__content`)],
};
let card = {
    cardClassName: `.card-item`,
    contentClassName: `.card__content`,
    picClassName: `.card__left-pic`,
    inputClassName: `.card__left-count`,
    cardPriceClassName: `.card__right-price`,
    trashCanClassName: `.card__right-button`,
    cardButtonsClassName: [`.card__left-button-minus`, `.card__left-button-plus`],
    productClassName: `.order__product-num`,
    totalClassName: `.order__total-num`,
    indexClassName: `.card__content-index`,
    orderButtonClassName: `.order__button`,
    orderClassName: `.card-order`
};

function filterLocStorage(str, index) {
    let result = [];
    if (index < 0) { return undefined }
    else {
        result = str.split(',');
        if (result.length - 1 < index || index < 0) { return undefined };
    };
    return result[index];
};

function locStorageChanger(storageName, index, changeIntoWhat) {
    const locStorage = localStorage.getItem(storageName).split(`,`)
    locStorage[index] = changeIntoWhat
    localStorage.setItem(storageName, locStorage)
}

let items = []

shop.buttonHtmlElement.forEach(i => {
    i.addEventListener(`click`, () => {
        const { boxClassName, picClassName, companyClassName, nameClassName, priceClassName, buttonClassName, formClassName, boxHtmlElement } = shop;
        const mainBox = i.closest(boxClassName);
        const button = mainBox.querySelector(buttonClassName);
        const form = mainBox.querySelector(formClassName);
        const pic = mainBox.querySelector(picClassName);
        const company = mainBox.querySelector(companyClassName);
        const name = mainBox.querySelector(nameClassName);
        const price = mainBox.querySelector(priceClassName);
        const index = boxHtmlElement.indexOf(mainBox);
        let nameFilter = name.innerHTML.replace('amp;', '')
        button.innerHTML = `in the cart`;
        button.style.width = `85px`;
        let createLink = () => {
            form.action = `pages/card.html`;
            button.type = `submit`;
        };
        let createPicLink = () => {
            let result = [];
            let stoper = 0;
            result = pic.src.split('/');
            result = result.filter((word) => {
                let r = true;
                if (word != 'images' && stoper != 1) { r = false }
                else { stoper = 1 };
                return r;
            });
            return result.join().replace(',', '/');
        };
        setTimeout(createLink, 1);
        items.push([index, createPicLink(), company.innerHTML, nameFilter, price.innerHTML, `count-1`]);
        items.forEach(i => localStorage.setItem(`item-${i[0]}`, i));
    });
});

function cardScript() {
    const buttonList = [...document.querySelectorAll(card.trashCanClassName), ...document.querySelectorAll(card.cardButtonsClassName[0]), ...document.querySelectorAll(card.cardButtonsClassName[1])];
    buttonList.forEach(i => {
        i.addEventListener('click', () => {
            const cardContent = i.closest(card.contentClassName);
            const cardButtonPlus = cardContent.querySelector(card.cardButtonsClassName[1]);
            const cardButtonMinus = cardContent.querySelector(card.cardButtonsClassName[0]);
            const cardButtonTrashCan = cardContent.querySelector(card.trashCanClassName);
            const count = cardContent.querySelector(card.inputClassName);
            const price = cardContent.querySelector(card.cardPriceClassName);
            const index = cardContent.querySelector(card.indexClassName);
            const totalCount = document.querySelector(card.productClassName)
            const totalPrice = document.querySelector(card.totalClassName)
            const className = () => {
                let trueOrFalse = false
                let getClassName = null
                i.className.split(' ').forEach(j => {
                    if (`.${j}` == card.cardButtonsClassName[0] || `.${j}` == card.cardButtonsClassName[1] || `.${j}` == card.trashCanClassName && trueOrFalse != true) {
                        trueOrFalse = true, getClassName = `.${j}`;
                    };
                });
                if (trueOrFalse === true) { return [true, getClassName] }
                else { return [false, getClassName] }
            };
            if (className()[0] && className()[1] == card.cardButtonsClassName[0] && Number(count.innerHTML) > 1) {
                price.innerHTML = `$${(Number((price.innerHTML).replace(`$`, ``)) - Number((filterLocStorage(localStorage.getItem(`item-${index.innerHTML}`), 4)).replace(`$`, ``))).toFixed(2)}`
                count.innerHTML = Number(count.innerHTML) - 1
                totalPrice.innerHTML = `$${(Number(totalPrice.innerHTML.replace(`$`, ``)) - Number((filterLocStorage(localStorage.getItem(`item-${index.innerHTML}`), 4)).replace(`$`, ``))).toFixed(1)}`
                locStorageChanger(`item-${index.innerHTML}`, 5, `count-${count.innerHTML}`)
            }
            else if (className()[0] && className()[1] == card.cardButtonsClassName[1] && Number(count.innerHTML) < 255) {
                count.innerHTML = Number(count.innerHTML) + 1
                console.log();
                price.innerHTML = `$${(Number((filterLocStorage(localStorage.getItem(`item-${index.innerHTML}`), 4)).replace(`$`, ``)) * Number(count.innerHTML)).toFixed(2)}`
                totalPrice.innerHTML = `$${(Number((filterLocStorage(localStorage.getItem(`item-${index.innerHTML}`), 4)).replace(`$`, ``)) + Number(totalPrice.innerHTML.replace(`$`, ``))).toFixed(1)}`
                locStorageChanger(`item-${index.innerHTML}`, 5, `count-${count.innerHTML}`)
            }
            else if (className()[0] && className()[1] == card.trashCanClassName) {
                cardContent.remove()
                totalCount.innerHTML = Number(totalCount.innerHTML) - 1
                totalPrice.innerHTML = `$${(Number(totalPrice.innerHTML.replace(`$`, ``)) - Number(price.innerHTML.replace('$', ``))).toFixed(1)}`
                localStorage.removeItem(`item-${index.innerHTML}`)
            };
        });
    });
};
if (document.querySelector(card.orderButtonClassName) !== null) {
    document.querySelector(card.orderButtonClassName).addEventListener('click', () => {
        localStorage.clear()
        location.reload()
    });
}

setTimeout(cardScript, 150);