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


//============= about =============
document.addEventListener("DOMContentLoaded", () => {

  const photos =
    document.querySelectorAll(".scroll-photo");

  const chairs =
    document.querySelectorAll(".scroll-chair");

  const titles =
    document.querySelectorAll(".scroll-title");

  const texts =
    document.querySelectorAll(".scroll-text");

  const chairGroups =
    document.querySelectorAll(".scroll-chair-group");


  /* ================================
     数値制限
  ================================ */

  function clamp(value, min, max) {

    return Math.max(
      min,
      Math.min(max, value)
    );

  }


  /* ================================
     範囲変換
  ================================ */

  function mapRange(
    value,
    inMin,
    inMax,
    outMin,
    outMax
  ) {

    const progress = clamp(
      (value - inMin) /
      (inMax - inMin),
      0,
      1
    );

    return (
      outMin +
      (outMax - outMin) *
      progress
    );

  }


  /* ================================
     1要素を動かす共通関数
  ================================ */

  function moveElement(
    element,
    settings
  ) {

    const rect =
      element.getBoundingClientRect();

    const vh =
      window.innerHeight;


    /*
    =================================

    登場

    画面下
       ↓
    opacity 0

       ↓

    opacity 1

    =================================
    */

    const enterProgress =
      clamp(
        (
          vh * settings.enterStart -
          rect.top
        ) /
        (
          vh *
          (
            settings.enterStart -
            settings.enterEnd
          )
        ),
        0,
        1
      );


    /*
    =================================

    退出

    画面上部に来る
       ↓
    opacityを落とす

    =================================
    */

    const exitProgress =
      clamp(
        (
          vh * settings.exitStart -
          rect.top
        ) /
        (
          vh *
          (
            settings.exitStart -
            settings.exitEnd
          )
        ),
        0,
        1
      );


    /* ================================
       Y移動
    ================================ */

    const enterY =
      mapRange(
        enterProgress,
        0,
        1,
        settings.fromY,
        0
      );


    const exitY =
      mapRange(
        exitProgress,
        0,
        1,
        0,
        settings.toY
      );


    const y =
      enterY +
      exitY;


    /* ================================
       opacity
    ================================ */

    const opacity =
      enterProgress *
      (1 - exitProgress);


    /* ================================
       適用
    ================================ */

    element.style.opacity =
      opacity;

    element.style.transform =
      `translate3d(
        0,
        ${y}px,
        0
      )`;

  }


  /* ================================
     animation
  ================================ */

  function animate() {


    /* ------------------------------
       写真

       一番大きく動く
       ゆっくりしたパララックス感
    ------------------------------ */

    photos.forEach((photo) => {

      moveElement(
        photo,
        {
          fromY: 130,
          toY: -170,

          enterStart: 1.05,
          enterEnd: 0.68,

          exitStart: 0.28,
          exitEnd: -0.25
        }
      );

    });


    /* ------------------------------
       椅子

       写真より軽く
       ふわっと浮く
    ------------------------------ */

    chairs.forEach((chair, index) => {

      const rect =
        chair.getBoundingClientRect();

      const vh =
        window.innerHeight;


      const enterProgress =
        clamp(
          (
            vh * 0.95 -
            rect.top
          ) /
          (vh * 0.3),
          0,
          1
        );


      const exitProgress =
        clamp(
          (
            vh * 0.2 -
            rect.top
          ) /
          (vh * 0.4),
          0,
          1
        );


      /*
      椅子ごとに
      微妙に動く量を変える
      */

      const speed =
        50 +
        index * 8;


      const enterY =
        mapRange(
          enterProgress,
          0,
          1,
          speed,
          0
        );


      const exitY =
        mapRange(
          exitProgress,
          0,
          1,
          0,
          -speed
        );


      /*
      少しだけ横にも揺らす
      */

      const x =
        Math.sin(
          window.scrollY * 0.003 +
          index
        ) * 4;


      /*
      少し回転
      */

      const rotate =
        Math.sin(
          window.scrollY * 0.002 +
          index
        ) * 1.5;


      chair.style.opacity =
        enterProgress *
        (1 - exitProgress);


      chair.style.transform =
        `
        translate3d(
          ${x}px,
          ${enterY + exitY}px,
          0
        )
        rotate(${rotate}deg)
        `;

    });


  /* ------------------------------
       見出し

       写真より動きを小さく
    ------------------------------ */

    titles.forEach((title) => {

      moveElement(
        title,
        {
          fromY: 55,
          toY: -70,

          enterStart: 0.95,
          enterEnd: 0.68,

          exitStart: 0.15,
          exitEnd: -0.18
        }
      );

    });

    /* ------------------------------
       文章

       一番動きを小さくする
       読みやすさ優先
    ------------------------------ */

    texts.forEach((text) => {

      moveElement(
        text,
        {
          fromY: 38,
          toY: -45,

          enterStart: 0.92,
          enterEnd: 0.7,

          exitStart: 0.1,
          exitEnd: -0.15
        }
      );

    });


    /* ------------------------------
       下の4脚

       まとまってふわっと
    ------------------------------ */

    chairGroups.forEach((group) => {

      moveElement(
        group,
        {
          fromY: 70,
          toY: -80,

          enterStart: 0.95,
          enterEnd: 0.65,

          exitStart: 0.12,
          exitEnd: -0.2
        }
      );

    });


    requestAnimationFrame(
      animate
    );

  }


  animate();

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


/* =====================================================
   MENU MODAL
===================================================== */


/* ========================================
   MENU DATA

   ★ メニューを追加・変更するときは
      基本的にここだけ編集
======================================== */

const menuData = {

    coffee: {

        title: "COFFEE",

        description: `
            <p>
                「本当の美味しさ」を求めて、
                店主自らが現地に足を運び、
                選び抜いたこだわりのブランド豆が届きました。
            </p>

            <p>
                豆の個性を大切に、
                じっくり丁寧にお淹れします。
                お店の中に広がる豊かな香りは、
                私たちの自慢です。
            </p>

            <p>
                今日は少しだけ立ち止まって、
                贅沢な香りに癒される時間を
                過ごしませんか？
                みなさまの日常に、
                ホッとできるひとときを
                お届けできますように。
            </p>
        `,

        mainImage: "./img/shop14.jpg",

        link: "./menu/menu.html",

        gallery: [
            "./img/shop14.jpg",
            "./img/shop15.jpg",
            "./img/shop11.jpg",
            "./img/latte01.jpg",
            "./img/latte02.jpg"
        ]

    },


    sweet: {

        title: "SWEET",

        description: `
            <p>
                お店でひとつひとつ丁寧に仕上げた
                自家製スイーツをご用意しています。
                コーヒーとの相性にもこだわった
                mellow cafe 自慢の味です。
            </p>

            <p>
                店内オリジナルケーキのほか、毎日変わる焼き菓子
                メニューもございます。
            </p>

            <p>
                ほのかな香りと甘さに癒される時間を
                みなさまの日常に、ほんのりお届けできますように。
            </p>
        `,

        mainImage: "./img/sweet01.jpg",

        link: "./menu/menu.html",

        gallery: [
            "./img/sweet01.jpg",
            "./img/sweet02.jpg",
            "./img/sweet03.jpg",
            "./img/sweet04.jpg",
            "./img/sweet05.jpg"
        ]

    },


    lunch: {

        title: "LUNCH",

        description: `
            <p>
                季節の野菜をたっぷり使ったプレートや、
                焼きたてのクロックムッシュなど、
                ほっと一息つけるランチをご用意しています。
            </p>

            <p>
                ゆっくり流れる時間と共に、
                mellow cafe のランチをお楽しみください。
            </p>

            <p>
                10：30〜15：00 / 数量限定・なくなり次第終了
            </p>
        `,

        mainImage: "./img/lunch4.jpg",

        link: "./menu/menu.html",

        gallery: [
            "./img/lunch1.jpg",
            "./img/lunch2.jpg",
            "./img/lunch3.jpg",
            "./img/lunch4.jpg",
            "./img/lunch5.jpg"
        ]

    },


    seasonal: {

        title: "SEASONAL",

        description: `
            <p>
                旬のフルーツや食材を使った、
                その季節だけの特別なメニューをご用意しています。
            </p>

            <p>
                春のやさしい甘さ、夏の爽やかさ、秋の深い味わい。冬のほっとする温かさ。
                いつものカフェの時間に、ほんの少し季節を感じてもらえるような一皿をお届けします。
            </p>

            <p>
                 移り変わる季節と共に、mellow cafe ならではの味をお楽しみください。
            </p>
        `,

        mainImage: "./img/seasonal1.jpg",

        link: "./menu/menu.html",

        gallery: [
            "./img/seasonal1.jpg",
            "./img/seasonal2.jpg",
            "./img/seasonal3.jpg",
            "./img/seasonal4.jpg",
            "./img/caramelapple.jpg"
        ]

    }

};


/* ELEMENT */

const menuModal = document.querySelector("#menuModal");

const menuModalClose =
    document.querySelector("#menuModalClose");

const menuModalTitle =
    document.querySelector("#menuModalTitle");

const menuModalImage =
    document.querySelector("#menuModalImage");

const menuModalDescription =
    document.querySelector("#menuModalDescription");

const menuModalLink =
    document.querySelector("#menuModalLink");

const menuModalGallery =
    document.querySelector("#menuModalGallery");

const menuModalOverlay =
    document.querySelector(".menu-modal-overlay");


/*  OPEN MODAL */

function openMenuModal(menuId) {

    const menu = menuData[menuId];

    if (!menu) {
        console.warn(
            `menuDataに「${menuId}」がありません。`
        );

        return;
    }


    /* タイトル */
    menuModalTitle.textContent = menu.title;


    /* メイン画像 */
    menuModalImage.src = menu.mainImage;
    menuModalImage.alt = menu.title;


    /* 説明 */
    menuModalDescription.innerHTML =
        menu.description;


    /* リンク */
    menuModalLink.href =
        menu.link;


    /* ギャラリー */
    menuModalGallery.innerHTML = "";


    menu.gallery.forEach((image, index) => {

        const item =
            document.createElement("div");

        item.className =
            "menu-modal-gallery-item";


        const img =
            document.createElement("img");

        img.src = image;

        img.alt =
            `${menu.title} ${index + 1}`;


        /* ギャラリークリックで
           メイン画像変更 */
        item.addEventListener("click", () => {

            menuModalImage.src = image;

        });


        item.appendChild(img);

        menuModalGallery.appendChild(item);

    });


    /* 表示 */
    menuModal.classList.add("active");

    menuModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /* 背景スクロール停止 */
    document.body.classList.add(
        "modal-open"
    );

}


/*  CLOSE MODAL */

function closeMenuModal() {

    menuModal.classList.remove("active");

    menuModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* MENU BUTTON */

document
    .querySelectorAll(".menu-detail-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const menuId =
                    button.dataset.menu;

                openMenuModal(menuId);

            }
        );

    });


/*  CLOSE*/

menuModalClose.addEventListener(
    "click",
    closeMenuModal
);


menuModalOverlay.addEventListener(
    "click",
    closeMenuModal
);


/*   ESC*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            menuModal.classList.contains("active")
        ) {

            closeMenuModal();

        }

    }
);


/* =====================================================
   slider
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector(".slider");

    if (!slider) return;

    /*元のスライドを取得*/

    const originalSlides = [...slider.querySelectorAll(".slide")];

    if (originalSlides.length === 0) return;


    /*無限ループ用に複製*/

    originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
    });


    /* ----------------------------------------
       設定
    ---------------------------------------- */

    const speed = 1; 
    let position = 0;

    let animationFrame;


    /* ----------------------------------------
       1セット分の幅
       
       300px × 13枚
       + gap 30px × 13枚
       ---------------------------------------- */

    const slideWidth = 300;
    const gap = 3;

    const loopWidth =
        (slideWidth + gap) * originalSlides.length;


    /* ----------------------------------------
       無限スクロール
    ---------------------------------------- */

    function animate() {

        position -= speed;

        /*
         * 13枚分移動したら
         * 最初の位置へ戻す
         *
         * 同じ画像を複製しているので
         * 見た目には途切れない
         */

        if (Math.abs(position) >= loopWidth) {
            position += loopWidth;
        }

        slider.style.transform =
            `translate3d(${position}px, 0, 0)`;

        animationFrame = requestAnimationFrame(animate);
    }


    animate();


    /* ----------------------------------------
       ページを離れたらアニメーション停止
    ---------------------------------------- */

    window.addEventListener("beforeunload", () => {
        cancelAnimationFrame(animationFrame);
    });

});

/* =====================================================
   space
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".space-gallery-item");

    // 3枚なければ処理しない
    if (items.length !== 3) {
        console.log("space-gallery-itemが3つ必要です");
        return;
    }

    let current = 0;


    // ========================================
    // ギャラリーを更新
    // ========================================

    function updateGallery() {

        // いったん全部のクラスを削除
        items.forEach((item) => {
            item.classList.remove(
                "left",
                "center",
                "right"
            );
        });


        // 現在の画像 → CENTER
        items[current].classList.add("center");


        // 次の画像 → RIGHT
        items[(current + 1) % 3].classList.add("right");


        // 前の画像 → LEFT
        items[(current + 2) % 3].classList.add("left");
    }


    // ========================================
    // 初期表示
    // ========================================

    updateGallery();


    // ========================================
    // 3秒ごとに入れ替える
    // ========================================

    setInterval(() => {

        current = (current + 1) % 3;

        updateGallery();

    }, 3000);

});
