const tblArrowSelect = (event, $table, callback) => {
    // const warpAll = $('.tbl-select-arrow');
    // warpAll.each(function (index) {
    //     index = index + 1;
    // });

    // console.log(warpAll.eq(indexTbl - 1).find($table).attr('ID'));

    const wrap = $table.closest('.tbl-select-arrow');  
    const tbodyHeight = wrap.height() - $table.find('thead').height();
    const fullHeight = $table.height();
    const inputAbsent = wrap.find('input[aria-controls=' + $table.attr('ID') + ']');
    const btnAbsent = wrap.find('#' + $table.attr('ID') + 'Btnfocus');
    if (btnAbsent.length === 0 && inputAbsent.length === 0) {
        const wrap = $table.hasClass('dataTable') ? wrap : $table;
        wrap.prepend($('<button>', {
            id: $table.attr('ID') + 'Btnfocus', 
            css: {
                // opacity: 0,
                height: '100px',
                width: '100px',
                border: 'none',
                outline: 'none',
                // position: 'absolute',
            },
        }));
    }
    const targetFocus = !$table.hasClass('dataTable') ? $('#' + $table.attr('ID') + 'Btnfocus') : inputAbsent;
    const rowCount = $table.find('tbody tr').length;
    if (rowCount > 0) {
        const row = $table.find('tbody tr');
        const cell = row.find('td');
        const firstRow = row.eq(0);
        const firstCell = cell.filter(':not(.d-none):not(.hide_column):not([style*="display: none"]):not([style*="visibility: hidden"])').eq(0);
        const itemHeight = row.height();
        targetFocus.focus();
        $table.hasClass('dataTable') ? firstCell.click() : firstRow.click().addClass("selected stayed");
        function keydown(){
            wrap.off('keydown').on('keydown', function (event) {
                var key = event.keyCode || event.which;
                var currentRow = $table.find("tbody tr.selected");
                var currentIndex = currentRow.index();
                if ($(event.target).closest(wrap).length > 0) {
                    if (key === 13) {
                        event.preventDefault();
                        $table.hasClass('dataTable') ?
                        $table.find("tbody tr td.focus").trigger("click") :
                        (
                            $table.find("tbody tr.stayed").removeClass('stayed') , 
                            currentRow.click().addClass('stayed')
                        );
                    }
                    if (key === 40 && !$table.hasClass('dataTable')) {
                        event.preventDefault();
                        const nextIndex = currentIndex + 1;
                        const nextRow = $table.find('tbody tr').eq(nextIndex < rowCount ? nextIndex : 0);
                        currentRow.removeClass("selected");
                        nextRow.addClass("selected");

                        const currentScroll = wrap.scrollTop();
                        const nextRowPosition = nextRow.position().top;
                        if (nextRowPosition > (itemHeight * 5)) {
                            wrap.scrollTop(currentScroll + itemHeight);
                        } else {
                            wrap.scrollTop(0);
                        }
                    }
                    if (key === 38 && !$table.hasClass('dataTable')) {
                        event.preventDefault();
                        const preIndex = currentIndex - 1;
                        const prevRow = $table.find('tbody tr').eq(preIndex >= 0 ? preIndex : rowCount - 1);
                        currentRow.removeClass("selected");
                        prevRow.addClass("selected");

                        const currentScroll = wrap.scrollTop();
                        const prevRowPosition = prevRow.position().top;
                        if (prevRowPosition < fullHeight - (itemHeight * 6)) {
                            wrap.scrollTop(currentScroll - itemHeight)
                        } else {
                            wrap.scrollTop(fullHeight) ;
                        }
                       
                    }
                } else {
                    cell.removeClass('focus');
                    $table.DataTable().cell.blur();
                }
            });
        };
        keydown();
        function clickRow (){
            row.off('click').one('click', function() {
                $(this).addClass('selected stayed').siblings().removeClass('selected stayed');
                targetFocus.focus();

                const currentRowPosition = $(this).position().top;
                const currentScroll = wrap.scrollTop(currentRowPosition - (itemHeight * 5));
                console.log("currentScroll : " + currentScroll);
                console.log("currentRowPosition : " + currentRowPosition);
                clickRow();
            });
        }
        !$table.hasClass('dataTable') ? clickRow() : null;
        $table.on('click', function(){
            targetFocus.focus();
        })
        $(document).on('click', function(event) {
            !$(event.target).closest($table).length && !$table.hasClass('dataTable') ?
            (
                row.each(function() {
                    $(this).hasClass('stayed') ? $(this).addClass('selected').siblings().removeClass('selected') : null ;
                })
            ) :
            (   
                !$table.hasClass('dataTable') ? 
                (
                    targetFocus.focus(),
                    clickRow (),
                    keydown()
                )
                : null
            );
        });
        if (typeof callback === 'function') {
            callback();
        } 
    }
};