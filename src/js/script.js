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
    if (value == 'open_nav') {
        $(`#main-navigation`).addClass('open')
    }
    if (value == 'undo_modal_store') {
        $(`#${value}`).modal('show');
    }
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