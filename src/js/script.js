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

function openNav(){
    $('#main-navigation').addClass('open')
}
function closeNav(){
    $('#main-navigation').removeClass('open')
}
