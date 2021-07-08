$('#main-navigation>ul>li').click(function(){
    $('#main-navigation>ul>li').removeClass('open')
    console.log("CLICK LI")
    $(this).addClass('open')
})
$('#main-navigation>ul>li>ul>li').click(function(){
    $('#main-navigation>ul>li>ul>li').removeClass('active')
    console.log("CLICK child LI")
    $(this).addClass('active')
})

function handleClick(value){
    console.log(value);

    if (value == 'open_nav') {
        $(`#main-navigation`).addClass('open')
    }
    if (value == 'undo_modal_store' || value == 'undo_modal_kiosk') {
        console.log(value);
        $(`#${value}`).modal('show');
    }
}

function openNav(){
    $(`#main-navigation`).addClass('open')
}

function closeNav(){
    $('#main-navigation').removeClass('open')
}
function openPopupType () {
    $('#createType').modal('toggle')
}
function openPopupType2 () {
    $('#createType2').modal('toggle')
}

function openModalConfirmAddCart () {
    $('#addCart').modal('toggle')
    $('#confirmAddCart').modal('toggle')
    
}

//event open dropdown search auto complete

/*$(document).on("click",".input-search-common",function(){
    $(this).find(".search-auto").removeClass("d-none")
})

window.addEventListener('click', function(e){
    if (document.getElementById('input-search-common').contains(e.target)){
    } else{
        if(e.target.className && (e.target.className == "input-search-common" || e.target.className == "line")) {
            if(document.getElementById("search-auto").classList.contains("d-none")) {
                document.getElementById("search-auto").classList.remove("d-none")
            }else {
                document.getElementById("search-auto").classList.add("d-none")
            }
        }else {
            document.getElementById("search-auto").classList.add("d-none")
        }
    }
})*/

//end event open dropdown search auto complete