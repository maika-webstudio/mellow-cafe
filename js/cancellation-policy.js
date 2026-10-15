//============= header =============

document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger-overlay');
  const nav = document.querySelector('.nav-overlay');

  // ハンバーガーメニュー開閉
  hamburger.addEventListener('click', () => {

    hamburger.classList.toggle('active');
    nav.classList.toggle('active');

    const isOpen = nav.classList.contains('active');

    hamburger.setAttribute('aria-expanded', isOpen);
    nav.setAttribute('aria-hidden', !isOpen);

    // メニューを開いている間は背景をスクロールさせない
    document.body.style.overflow = isOpen ? 'hidden' : '';

  });


  //============= ページ内リンク =============

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {

    link.addEventListener('click', (e) => {

      const targetId = link.getAttribute('href');

      // #top などのページ内リンクだけ処理
      if (targetId && targetId.startsWith('#')) {

        const target = document.querySelector(targetId);

        if (target) {

          e.preventDefault();

          // メニューを閉じる
          hamburger.classList.remove('active');
          nav.classList.remove('active');

          hamburger.setAttribute('aria-expanded', 'false');
          nav.setAttribute('aria-hidden', 'true');

          document.body.style.overflow = '';

          // ヘッダーの高さ分だけ調整
          const headerHeight = document.querySelector('header').offsetHeight;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          // スムーズスクロール
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

        }

      }

    });

  });


  //============= ESCキーでメニューを閉じる =============

  document.addEventListener('keydown', (e) => {

    if (
      e.key === 'Escape' &&
      nav.classList.contains('active')
    ) {

      hamburger.classList.remove('active');
      nav.classList.remove('active');

      hamburger.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');

      document.body.style.overflow = '';

    }

  });

});




