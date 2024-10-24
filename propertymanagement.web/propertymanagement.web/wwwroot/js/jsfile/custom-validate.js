var customValidate = (function () {
    let validateField = (obj) => {
        let result = true;
        let fields = $(obj).find('.isrequired-field');
        fields.each((_,item) => {
            if (isTypeInput(item)) {
                if (item.type == "checkbox") {
                    if ($(item).attr('data-isGroup')) {
                        let items = $(obj).find('[data-isGroup="' + $(item).attr('data-isGroup') + '"]');
                        let itemsChecked = $(obj).find('[data-isGroup="' + $(item).attr('data-isGroup') + '"]:checked');
                        if (!itemsChecked.length > 0) {
                            items.each((_, itm) => {
                                result = doInvalidField(obj, itm);
                            })
                        } else {
                            items.each((_, itm) => {
                                doValidField(obj, itm);
                            })
                        }
                    } else {
                        if (!$(item).is(':checked')) {
                            result = doInvalidField(obj, item);
                        } else {
                            doValidField(obj, item);
                        }
                    }
                }
                else if (obj.type == "radio") {
                    let items = $(obj).find('[name="' + $(item).prop('name') + '"]');
                    let itemsChecked = $(obj).find('[name="' + $(item).prop('name') + '"]:checked');
                    if (!itemsChecked.length > 0) {
                        items.each((_, itm) => {
                            result = doInvalidField(obj, itm);
                        })
                    } else {
                        items.each((_, itm) => {
                            doValidField(obj, itm);
                        })
                    }
                } else {
                    if (!$(item).val()) {
                        result = doInvalidField(obj, item);
                    } else {
                        doValidField(obj, item);
                    }
                }
            }
        });

        return result;
    }

    function isTypeInput(obj) {
        if (obj.tagName == "INPUT") {
            return true
        }
        if (obj.tagName == "SELECT") {
            return true;
        }
        if (obj.tagName == "TEXTAREA") {
            return true;
        }

        return false;
    }

    function doValidField(form,obj) {
        let label = $(form).find('label[for="' + $(obj).prop('id') + '"], label[for="' + $(obj).prop('name') + '"]');
        label.find('.isrequired-label').remove();
        let formGroup = $(obj).closest('.customValidate');
        if (formGroup.length > 0) {
            $(obj).closest('.customValidate').removeClass('invalid');
        } else {
            $(obj).removeClass('invalid');
        }
    }

    var isScrolled = false;
    function doInvalidField(form,obj) {
        let label = $(form).find('label[for="' + $(obj).prop('id') + '"], label[for="' + $(obj).prop('name') + '"]');
        if (!label.find('.isrequired-label').length > 0) {
            label.html(label.text() + '<span class="isrequired-label"> *</span>');
        }
        let formGroup = $(obj).closest('.customValidate');
        if (formGroup.length > 0) {
            $(obj).closest('.customValidate').addClass('invalid');
        } else {
            $(obj).addClass('invalid');
        }

        if (!isScrolled) {
            scrollToInvalidField(obj);
            isScrolled = true;
        }

        return false;
    }

    function scrollToInvalidField(obj) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(obj).offset().top - 100
        }, 500);
    }
    
    return {
        validate: (form) => {
            let result = validateField(form);
            isScrolled = false;

            return result;
        },
        removeInvalidFieldState: (form, obj) => {
            doValidField(form, obj);
        },
    }
})();