const tblSetHeight = ($table, offset) =>{
    const table = document.getElementById($table);
    const windowHeight = Number(window.innerHeight);
    const tblTop = Number(table.getBoundingClientRect().top);
    const topFromBottom = Number(windowHeight - tblTop);
    // const heightAbove = Number(windowHeight - topFromBottom);
    
    table.style.height = Math.abs(topFromBottom - offset) + 'px';
}

    // const tblSiblings = Array.from(table.parentElement.children);
    // const tblIndex = tblSiblings.indexOf(table);
    // var heightBelow = 0;
    // for (var i = tblIndex + 1; i < tblSiblings.length; i++) {
    //     heightBelow += tblSiblings[i].offsetHeight;
    // }

    // let tblHeight = topFromBottom - heightAbove;
    // const tblBottom = table.getBoundingClientRect().bottom;
    // const heightBelow = windowHeight - tblBottom;