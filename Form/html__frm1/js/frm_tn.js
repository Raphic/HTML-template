'use_strict';

document.addEventListener("DOMContentLoaded", function () {
    // Chức năng keydown change focus input
    const inputFocus = [
        "txtSoDienThoaiBN",
        "txtNgheNghiepBN",
        "cboLoaiKhachBN",
        "cboDanTocBN",
        "cboGioiTinhBN",
        "txtDiaChiBN",
        "txtSoNhaBN",
        "cboTinhThanh",
        "cboHuyenThi",
        "cboPhuongXa",
        "cboMoiQuanHeBN",
        "txtNguoiLienHe",
        "txtSoDienThoaiNLH",
        "txtCCCDNguoiLienHe",
        "cboDiaDiemTNTT",
        "cboDieuTriBanDauTNTT",
        "cboBoPhanTNTT",
        "cboNguyenNhanTNTT",
        "txtSoTheBHYT",
        "txtNoiDangKyKCB",
        "dtpBHYTTuNgay",
        "dtpBHYTTuNgay",
        "txtDoiTuongBHYT",
        "txtTyLeMienGiam",
        "cboDoiTuongKB",
        "cboCongKhamKB",
        "cboDichVuKB",
        "cboPhongKhamKB",
        "cboHinhThucNopTien",
        "txtSoTienNop",
        "danhmuckham",
        "quaytiepnhan",
    ];
    function findNextInput(currentInput) {
        const currentId = currentInput.id;
        let nextIndex = inputFocus.indexOf(currentId) + 1;
        while (nextIndex < inputFocus.length) {
            const nextInput = document.getElementById(inputFocus[nextIndex]);
            if (nextInput && !nextInput.disabled && !nextInput.readOnly) {
                return nextInput;
            }
            nextIndex++;
        }

        return null;
    }
    function findPreviousInput(currentInput) {
        const currentId = currentInput.id;
        let previousIndex = inputFocus.indexOf(currentId) - 1;
        while (previousIndex >= 0) {
            const prevInput = document.getElementById(inputFocus[previousIndex]);
            if (prevInput && !prevInput.disabled && !prevInput.readOnly) {
                return prevInput;
            }
            previousIndex--;
        }
        return null;
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
    //Disable tabs khi lựa chọn nôi-ngoại trú
    const select = (id) => document.getElementById(id);
    const tabSettings = [
        {
            idSelect: 'frm_receive__reception--type',
            tabs: [
                'frm_receive__info-tab1',
                'frm_receive__info-tab2',
                'frm_receive__info-tab3'
            ]
        },
    ];
    tabSettings.forEach(setting => {
        const selectElement = select(setting.idSelect);
        if (selectElement) {
            const tabs = setting.tabs.map(select);
            let activeTabIndex = 0;
            let lastActiveTabIndex = 0;
            function updateTabs() {
                if (selectElement.value === '1') {
                    tabs.forEach(tab => {
                        tab.disabled = false;
                        // Kiểm tra nếu không có thuộc tính name là "tabs-css", thì disable các thẻ input, select, textarea
                        const elementsInTab = tab.parentElement.querySelectorAll('input, select, textarea');
                        elementsInTab.forEach(element => {
                            if (element.getAttribute('name') !== 'tabs-css') {
                                element.disabled = false;
                            }
                        });
                    });
                    tabs[lastActiveTabIndex].checked = true;
                } else if (selectElement.value === '2') {
                    tabs.forEach((tab, index) => {
                        if (index === 1) {
                            tab.checked = true;
                        } else {
                            tab.disabled = true;
                            // Kiểm tra nếu không có thuộc tính name là "tabs-css" và tab thực sự đã bị disable, thì disable các thẻ input, select, textarea
                            const elementsInTab = tab.parentElement.querySelectorAll('input, select, textarea');
                            elementsInTab.forEach(element => {
                                if (element.getAttribute('name') !== 'tabs-css' && !element.closest('#frm_receive__info-tnthuongtich')) {
                                    element.disabled = true;
                                }
                            });
                        }
                    });
                    lastActiveTabIndex = activeTabIndex;
                }
            }
            selectElement.addEventListener('change', () => {
                updateTabs();
            });
            updateTabs();
            tabs.forEach((tab, index) => {
                tab.addEventListener('change', () => {
                    activeTabIndex = index;
                });
            });
        }
    });
    //End Disable tabs khi lựa chọn nôi-ngoại trú

    //Tính toán tuổi khi chọn ngày tháng năm sinh
    function calculateAge(inputId, ageOutputId, monthOutputId) {
        const [dayOfBirthInput, ageInput, monthInput] = [inputId, ageOutputId, monthOutputId].map(id => document.getElementById(id));
        if (!dayOfBirthInput || !ageInput || !monthInput) {
            return;
        }
        dayOfBirthInput.addEventListener('input', function () {
            const selectedDate = new Date(this.value);
            const currentDate = new Date();
            if (selectedDate > currentDate) {
                alert('Bạn không thể chọn một ngày sau ngày hiện tại.');
                this.value = '';
                return;
            }
            const ageInMilliseconds = currentDate - selectedDate;
            const ageInMonths = ageInMilliseconds / (1000 * 60 * 60 * 24 * 30.44);
            const ageInYears = Math.floor(ageInMonths / 12);
            const remainingMonths = Math.floor(ageInMonths % 12);
            if (!isNaN(ageInYears) && !isNaN(remainingMonths)) {
                ageInput.value = ageInYears;
                monthInput.value = remainingMonths;
            } else {
                ageInput.value = '';
                monthInput.value = '';
            }
        });
    }
    function calculateAgeSetting(setting) {
        calculateAge(setting.inputId, setting.ageOutputId, setting.monthOutputId);
    }
    const calculateAgeSettings = [
        {
            inputId: 'frm_receive__patient--day-birth',
            ageOutputId: 'frm_receive__patient--day-birth-age',
            monthOutputId: 'frm_receive__patient--day-birth-month'
        },
    ];
    calculateAgeSettings.forEach(setting => {
        calculateAgeSetting(setting);
    });
    //End Tính toán tuổi khi chọn ngày tháng năm sinh

    // Định nghĩa một thư viện để cập nhật thời gian
    const DateTimeUpdater = {
        update: function (settings) {
            const currentDate = new Date();
            settings.forEach(setting => {
                const { offsetDay, timeZone, outputSelector, type } = setting;
                const timeZoneOffset = timeZone * 60; // Độ chênh lệch múi giờ tính bằng phút
                const offsetMilliSeconds = offsetDay * 24 * 60 * 60 * 1000; // Độ trễ tính bằng mili giây
                currentDate.setMinutes(currentDate.getMinutes() + timeZoneOffset);
                currentDate.setTime(currentDate.getTime() + offsetMilliSeconds);
                const currentDateTime = currentDate.toISOString().slice(0, type === "date" ? 10 : 16);
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
    const settings = [
        {
            offsetDay: 0,
            timeZone: 7, // Múi giờ GMT+7
            outputSelector: "#frm_receive__info--date",
            type: "date"
        },
        {
            offsetDay: 0,
            timeZone: 0, // Múi giờ GMT+7
            outputSelector: "#frm_receive__enter--medical-day",
            type: "datetime-local"
        }
    ];
    DateTimeUpdater.update(settings);


    const btnLuu = document.querySelector('#btnLuu');
    if (btnLuu) {
        btnLuu.addEventListener('click', () => {
            const MaBenhNhan = document.querySelector('#frm_receive__patient--scan-card').value;
            const SoTheBHYT = document.querySelector('#frm_receive__card--code').value;
            const UuTien = '1';

            callAPI('/tiepnhan/taotiepnhan', {
                MaBenhNhan,
                SoTheBHYT,
                UuTien,
            }, (response) => {
                thongbao({
                    noidung: response.Messenge,
                    type: 'success',
                    callback: () => {
                        window.location.href = '/tiepnhan';
                    },
                });
            });
        });
    }

    //Drop draf action
    const dragSetting = {
        dragBoxChildClass: 'drag-box--child',
        orderAttribute: 'data-order',
        editButtonId: 'editButton',
        saveButtonId: 'saveButton',
        overClass: 'over',
        editModeClass: 'edit-mode',
    };
    function checkDrag() {
        const requiredElements = ['editButtonId', 'saveButtonId'];
        const missingElements = requiredElements.filter(element => !document.getElementById(dragSetting[element]));
        if (missingElements.length === 0) {
            console.log('Đầy đủ');
            let draggedItem = null;
            let isEditMode = false;
            const toggleDraggable = () => {
                const draggables = document.querySelectorAll(`.${dragSetting.dragBoxChildClass}`);
                draggables.forEach(item => (item.draggable = isEditMode));
            };
            // Hàm để lưu dữ liệu vào Local Storage
            const saveToLocalStorage = () => {
                const orderData = Array.from(document.querySelectorAll(`.${dragSetting.dragBoxChildClass}`)).map(item =>
                    item.getAttribute(dragSetting.orderAttribute)
                );
                localStorage.setItem('orderData', JSON.stringify(orderData));
            };
            const loadFromLocalStorage = () => {
                const orderData = JSON.parse(localStorage.getItem('orderData')) || [];
                const container = document.querySelector('.drag-box');
                const draggables = Array.from(container.querySelectorAll(`.${dragSetting.dragBoxChildClass}`));
                const orderDataMap = {};
                orderData.forEach((order, index) => {
                    orderDataMap[order] = index;
                });
                draggables.sort((a, b) => {
                    const orderA = a.getAttribute(dragSetting.orderAttribute);
                    const orderB = b.getAttribute(dragSetting.orderAttribute);

                    return orderDataMap[orderA] - orderDataMap[orderB];
                });
                container.innerHTML = '';
                draggables.forEach(item => container.appendChild(item));
            };
            isEditMode = false;
            toggleDraggable();
            document.getElementById(dragSetting.editButtonId).addEventListener('click', () => {
                isEditMode = true;
                toggleDraggable();
                document.body.classList.add(dragSetting.editModeClass);
            });
            document.getElementById(dragSetting.saveButtonId).addEventListener('click', () => {
                saveToLocalStorage();
                isEditMode = false;
                toggleDraggable();
                document.body.classList.remove(dragSetting.editModeClass);
            });
            loadFromLocalStorage();
            document.addEventListener("dragstart", (event) => {
                draggedItem = event.target;
            });
            document.addEventListener("dragend", (event) => {
                event.preventDefault();
            });
            document.addEventListener("dragenter", (event) => {
                event.preventDefault();
                if (event.target.classList.contains(dragSetting.dragBoxChildClass)) {
                    event.target.classList.add(dragSetting.overClass);
                }
            });
            document.addEventListener("dragleave", (event) => {
                if (event.target.classList.contains(dragSetting.dragBoxChildClass)) {
                    event.target.classList.remove(dragSetting.overClass);
                }
            });
            document.addEventListener("dragover", (event) => {
                event.preventDefault();
            });
            document.addEventListener("drop", (event) => {
                event.preventDefault();
                if (event.target.classList.contains(dragSetting.dragBoxChildClass)) {
                    event.target.classList.remove(dragSetting.overClass);
                    const target = event.target;
                    const parent = target.parentNode;
                    const items = Array.from(parent.children);
                    const sourceIndex = items.indexOf(draggedItem);
                    const targetIndex = items.indexOf(target);

                    if (sourceIndex !== -1 && targetIndex !== -1) {
                        parent.insertBefore(draggedItem, targetIndex > sourceIndex ? target.nextSibling : target);
                        saveToLocalStorage();
                    }
                }
                draggedItem = null;
            });
        } else {
            console.log('Thiếu các phần tử HTML: ' + missingElements.join(', '));
        }
    }
    checkDrag();
    //End Drop draf action
});

// $(document).ready(function() {
//     $('select.input').select2({
//         language: 'vi',
//     });
// });
