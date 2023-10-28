'use_strict';

// Include other script
// function include(scriptUrl) {
//     document.write('<script src="' + scriptUrl + '"></script>');
// }
// function isIE() {
//     var myNav = navigator.userAgent.toLowerCase();
//     return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
// };
document.addEventListener("DOMContentLoaded", function() {
    // Định nghĩa một thư viện để cập nhật thời gian
    const DateTimeUpdater = {
        update: function (settings) {
            const currentDate = new Date();
            // Duyệt qua từng cài đặt và cập nhật thời gian cho từng trường
            settings.forEach(setting => {
                const { offsetDay, timeZone, outputSelector, type } = setting;
                // Tính toán thời gian theo múi giờ và độ trễ
                const timeZoneOffset = timeZone * 60; // Độ chênh lệch múi giờ tính bằng phút
                const offsetMilliSeconds = offsetDay * 24 * 60 * 60 * 1000; // Độ trễ tính bằng mili giây
                currentDate.setMinutes(currentDate.getMinutes() + timeZoneOffset);
                currentDate.setTime(currentDate.getTime() + offsetMilliSeconds);
                // Format thời gian thành chuỗi
                const currentDateTime = currentDate.toISOString().slice(0, type === "date" ? 10 : 16);
                // Cập nhật giá trị cho trường cụ thể
                const element = document.querySelector(outputSelector);
                if (element) {
                    element.value = currentDateTime;
                    if (type) {
                        element.type = type;
                    }
                }
            });
        }
    };
    // Sử dụng thư viện để cập nhật thời gian cho các trường cụ thể
    const settings = [
        {
            offsetDay: 0, 
            timeZone: 7, // Múi giờ GMT+7
            outputSelector: "#frm__right-info-medical--time",
            type: "datetime-local"
        },
        {
            offsetDay: 3,
            timeZone: 7,
            outputSelector: "#frm__right-info-medical--appoint",
            type: "date"
        }
    ];
    DateTimeUpdater.update(settings);
    // End định nghĩa một thư viện để cập nhật thời gian

    // Định nghĩa một thư viện để quản lý thứ tự di chuyển giữa các trường input
    const inputFocus = [
        "frm__left-frm-day",
        "frm__left-to-day",
        "load-slbn-bhyt",
        "frm__right-info-patient--surplus",
        "frm__right-info-patient--name",
        "frm__right-info-patient--code",
        "frm__right-info-patient--target",
        "frm__right-info-patient--number",
        "frm__right-info-patient--expired",
        "frm__right-info-patient--sale",
        "frm__right-info-patient--age",
        "frm__right-info-patient--gender",
        "frm__right-info-patient--address",
        "frm__right-info-medical--time",
        "frm__right-info-medical--icd01",
        "frm__right-info-medical--icd01-expand",
        "frm__right-info-medical--icd02",
        "frm__right-info-medical--icd02-expand",
        "frm__right-info-medical--solving",
        "frm__right-info-medical--solving-expand",
        "frm__right-info-medical--appoint",
        "frm__right-info-medical--appoint-note",
        "frm__right-info-medical--appoint-expand",
        "frm__right-info-medical--diagnosis",
        "frm__right-info-medical--symptom",
        "frm__right-info-medical--note-txt",
        "frm__right-info-medical--disabilities",
        "frm__right-info-medical--doctor",
        "frm__right-info-medical--vessel",
        "frm__right-info-medical--breathing",
        "frm__right-info-medical--height",
        "frm__right-info-medical--temperature",
        "frm__right-info-medical--pressure",
        "frm__right-info-medical--pressure-expand",
        "frm__right-info-medical--weight",
        "frm__right-info-medical--sugar",
        "frm__right-info-medical--progress",
        "frm__right-info-medical--stage",
        "frm__right-info-medical--txt-01",
        "frm__right-info-medical--txt-02",
        "frm__right-info-medical--textarea",
        "frm__right-info-medical--eye-no-glass-right",
        "frm__right-info-medical--eye-no-glass-left",
        "frm__right-info-medical--eye-glass-right",
        "frm__right-info-medical--eye-glass-left",
        "frm__right-info-medical--eye-pressure-right",
        "frm__right-info-medical--eye-pressure-left",
        "frm__left-frm-day",
    ];
    function findNextInput(currentInput) {
        const currentId = currentInput.id;
        const nextIndex = inputFocus.indexOf(currentId) + 1;
        if (nextIndex < inputFocus.length) {
            return document.getElementById(inputFocus[nextIndex]);
        } else {
            return null;
        }
    }
    function findPreviousInput(currentInput) {
        const currentId = currentInput.id;
        const previousIndex = inputFocus.indexOf(currentId) - 1;
        if (previousIndex >= 0) {
            return document.getElementById(inputFocus[previousIndex]);
        } else {
            return null;
        }
    }
    const inputs = document.querySelectorAll('.input');
    inputs.forEach((input) => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === 'ArrowRight') {
                event.preventDefault();
                const nextInput = findNextInput(input);
                if (nextInput) {
                    nextInput.focus();
                }
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                const prevInput = findPreviousInput(input);
                if (prevInput) {
                    prevInput.focus();
                }
            }
        });
    });
    // End Chức năng keydown change focus input
});