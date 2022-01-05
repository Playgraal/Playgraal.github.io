(function () {
    const navbarFadeInPosition = 140
    const navbar = document.getElementById('main-nav')
    let timeOut = null

    const handleScroll = (e) => {
        console.log('handleScroll')
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            if (e.target.body.scrollTop > navbarFadeInPosition) {
                navbar.classList.remove('animate__fadeInDown')
                navbar.classList.add('animate__fadeOutUp')
            } else {
                navbar.classList.remove('animate__fadeOutUp')
                navbar.classList.add('animate__fadeInDown')
            }
        }, 200)
    }

    document.addEventListener('scroll', handleScroll)

})()