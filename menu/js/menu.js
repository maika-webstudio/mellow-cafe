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

//============= scroll down =============
document.addEventListener("DOMContentLoaded", () => {
  const text = "SCROLL DOWN ";
  const repeatedText = text.repeat(2);
  const circleText = document.querySelector(".circle-text_01");
  const totalChars = repeatedText.length;
  const anglePerChar = 360 / totalChars;

  for (let i = 0; i < totalChars; i++) {
    const span = document.createElement("span");
    span.textContent = repeatedText[i];
    span.style.transform = `rotate(${i * anglePerChar}deg)`;
    circleText.appendChild(span);
  }
});

/* =====================================================
   LOADING SCREEN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen =
        document.getElementById("loading-screen");

    const main =
        document.getElementById("main");

    const percent =
        document.querySelector(".loading-percent");


    if (!loadingScreen) return;


    /* ========================================
       ローディング中はスクロール禁止
    ======================================== */

    document.body.style.overflow = "hidden";


    /* ========================================
       パーセント表示
    ======================================== */

    let count = 0;

    const percentTimer = setInterval(() => {

        count += 1;

        if (count >= 100) {

            count = 100;

            clearInterval(percentTimer);

        }

        if (percent) {

            percent.textContent =
                count + "%";

        }

    }, 30);


    /* ========================================
       ページ読み込み完了
    ======================================== */

    window.addEventListener("load", () => {

        /*
         * 最低3秒はローディングを見せる
         * コーヒーを淹れている演出のため
         */

        setTimeout(() => {

            /* 100%にする */
            count = 100;

            if (percent) {
                percent.textContent = "100%";
            }


            /* --------------------------------
               少し間を置いてローディング終了
            -------------------------------- */

            setTimeout(() => {

                /* ローディングをフェードアウト */
                loadingScreen.classList.add(
                    "is-hidden"
                );


                /* --------------------------------
                   ファーストビュー表示
                -------------------------------- */

                setTimeout(() => {

                    if (main) {

                        main.classList.add(
                            "is-visible"
                        );

                    }


                    /* --------------------------------
                       スクロール解除
                    -------------------------------- */

                    document.body.style.overflow = "";

                }, 450);


            }, 350);


        }, 3000);

    });

});


