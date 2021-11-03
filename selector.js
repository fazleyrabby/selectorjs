let selector = function (selector, config = {}) {

    let selects = document.querySelectorAll(selector);

    selects.forEach((select, key) => {
        select.classList.add('selectorjs__hidden');

        const selectorTxt = selector.replace('.', '');


        let __container = document.createElement('div');
        __container.classList.add(selectorTxt);
        __container.classList.add('selector__container');

        let __select = document.createElement('div');
        __select.classList.add(selectorTxt + '__select');
        __select.classList.add('selector__select');

        __container.appendChild(__select);

        let __placeholder = document.createElement('div');
        __placeholder.classList.add(selectorTxt);
        __placeholder.classList.add('selector__placeholder');

        let placeholderTxt = document.createTextNode(config?.placeholder ?? 'Select Options')
        __placeholder.appendChild(placeholderTxt)

        let __caret = document.createElement('div');
        __caret.classList.add(selectorTxt);
        __caret.classList.add('selector__caret');

        __select.appendChild(__placeholder);
        __select.appendChild(__caret);

        let __select_container = document.createElement('div');
        __select_container.classList.add(selectorTxt);
        __select_container.classList.add('selector__select_container');

        let __search = document.createElement('div');
        __search.classList.add(selectorTxt);
        __search.classList.add('selector__search');

        __select_container.appendChild(__search);

        let __search_box = document.createElement('div');
        __search_box.classList.add(selectorTxt);
        __search_box.classList.add('selector__search_box');
        __search_box.setAttribute('contenteditable', true);

        __search.appendChild(__search_box);


        let options = select.querySelectorAll('option');


        options.forEach(element => {
            let txt = element.textContent;
            let value = element.value;
            let __custom__option = document.createElement('div');
            __custom__option.classList.add(selectorTxt);
            __custom__option.classList.add('selector__custom__option');
            __custom__option.setAttribute('data-value', value)
            let optionTxtConent = document.createTextNode(txt)
            __custom__option.appendChild(optionTxtConent);
            __select_container.appendChild(__custom__option);
        });

        __container.appendChild(__select_container);

        select.insertAdjacentElement('afterend', __container);

        __select.addEventListener('click', () => __select_container.classList.toggle('show'));


        let type = select.getAttribute('multiple');
        let container = document.querySelector(selector + '.selector__container');
        let search = container.querySelector(`${selector}.selector__select_container ${selector}.selector__search ${selector}.selector__search_box`);
        let custom_options = document.querySelectorAll(`${selector}.selector__custom__option`);


        const activeOption = (active, target) => {
            let arr = [];
            let filteredOptions = [];
            active.forEach(e => arr.push(e.dataset.value));
            active.forEach(e => {
                filteredOptions.push({ text: e.innerText, value: e.dataset.value })
            });

            activeTags(filteredOptions, target);


            options.forEach(each => {
                if (arr.includes(each.value)) {
                    each.setAttribute('selected', 'true');
                } else {
                    each.removeAttribute('selected');
                }
            })
        }

        const activeTags = (options, target) => {
            let defaultPlaceholder = config?.placeholder ?? 'Select Placeholder';
            let placeholder = target.querySelector(selector + '.selector__placeholder');
            let html = '';
            if (options.length == 0) {
                html = '';
                html += defaultPlaceholder
            }

            options.forEach((option, key) => {
                let separator = ',';
                if (options.length - 1 == key) separator = '';
                html += option.text + separator;
            })

            placeholder.innerHTML = html;
        }

        const reset = () => {
            custom_options.forEach(each => each.classList.remove('active'));
        }

        const multiple = (type) => {
            console.log(type);
            if (type != 'multiple' && type != "" && type != 'true') {
                return false
            }
            else {
                return true
            }
        }

        search?.addEventListener('keyup', e => {
           
            let filter = e.target.innerText;
            filter = filter.toLowerCase();
            let arr = [];
            custom_options.forEach(each => {
                let txt = each.textContent || each.innerText;
                if (txt.toLowerCase().indexOf(filter) > -1) {
                    each.style.display = "block"
                } else {
                    each.style.display = "none"
                }
            });
        })


        custom_options?.forEach(option => {
            option.addEventListener('click', e => {
                if (!multiple(type)) {
                    reset();
                    e.target.parentNode.classList.remove('show');
                    e.target.classList.add('active');
                } else {
                    e.target.classList.toggle('active');
                }

                // let optionText = option.textContent;
                // let value = option.dataset.value;
                let parent = e.target.parentNode.closest(selector + '.selector__container');

                let custom_options_active = parent.querySelectorAll(selector + '.selector__custom__option.active');

                activeOption(custom_options_active, parent)
            })
        })
    })



}