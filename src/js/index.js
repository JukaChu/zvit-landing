let navPoints = [...document.querySelectorAll('.navigation-point')];
let navDots = [...document.querySelectorAll('.navigation-point__dot')];


function headerAnimation() {
    navPoints.map((point, i) => {
        if (i !== 2) {
            return point.style.visibility = 'hidden';
        } else {
            point.classList.add('navigation-point--checked');
            let elementBefore = [...document.querySelectorAll('.navigation-point--checked')][0];
            setTimeout(() => {
                point.classList.add('navigation-point--before');
                return point.firstElementChild.style.animation = '1s ease-in-out 1 forwards textMoves'
            }, 1000);
            return elementBefore.addEventListener('click', headerAnimationReverse);
        }

    });

    navDots.map((dot) => dot.style.display = 'none');
    // declarationDiv();
    navPoints.map((point) => point.removeEventListener('click', headerAnimation))
    setTimeout(declarationDiv, 1000)

}

function headerAnimationReverse() {
    navPoints[2].firstElementChild.style.animation = 'none';
    navPoints[2].firstElementChild.style.animation = '1s ease-in-out 1 forwards textMovesReverse';
    const classBefore = 'navigation-point--before';
    let elementBefore = [...document.querySelectorAll('.navigation-point--checked')][0];

    setTimeout(() => {
        elementBefore.classList.add('navigation-point--reverse-animation');
        elementBefore.classList.remove(classBefore);
        document.getElementsByClassName('header__bottom-side')[0]
            .removeChild([...document.querySelectorAll('.declaration')][0])
    }, 1000);

    setTimeout(() => {
        const classChecked = 'navigation-point--checked';
        const classReverse = 'navigation-point--reverse-animation';

        navPoints.map((point) => {
            if (point.classList.contains(classReverse)) {
                point.classList.remove(classReverse);
                point.classList.remove(classChecked);
            }
            point.style.visibility = 'visible';
            navDots.map((dot) => dot.style.display = 'block')
        })
    }, 2000);

    elementBefore.removeEventListener('click', headerAnimationReverse);
    navPoints.map((point) => point.addEventListener('click', headerAnimation))

}

navPoints.map((point) => {
    return point.addEventListener('click', headerAnimation)
});

function declarationDiv() {
    const paragraphName = ['Виплати, пов\'язані з трудовими відносинами', 'Стипендії',
        'Доходи від продажу/обміну майна', 'Підприємницькі доходи(припинення діяльності)',
        'Дохід від незалежної професійної діяльності'];
    let elemDeclaration = '';
    let newButtonDeclaration = '<button class="declaration__create-declaration" title="Creating declaration">'+
        'сформувати декларацію</button>';

    let newDiv = document.createElement('section');
    newDiv.classList.add('declaration');
    paragraphName.map((name, index) => {
        let paragraphText = `<div class='declaration__article'>
<p class="declaration__paragraph  declaration__paragraph--${index}">${name}</p></div>`;
        return elemDeclaration += paragraphText;

    });
    elemDeclaration += newButtonDeclaration;
    newDiv.innerHTML = elemDeclaration;
    document.getElementsByClassName('header__bottom-side')[0].appendChild(newDiv)
}

