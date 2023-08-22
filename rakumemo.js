(() => {

    // データセット
    const $addBtn = document.querySelector("[data-addBtn]");
    const $table = document.getElementById("table");
    const $calcBtn = document.querySelector("[data-calcBtn]");
    const $calcResult = document.querySelector("[data-calcResult]");
    let $deleteBtn = document.querySelectorAll("[data-delete]");
    let $memoInp = document.querySelectorAll("[data-memoInp]");
    let $price = document.querySelectorAll("[data-price]");
    let $qua = document.querySelectorAll("[data-qua]");
    let $dis = document.querySelectorAll("[data-dis]");
    let $cons = document.querySelectorAll("[data-cons]");

    // データ更新
    const dataUpDate = () => {
        $deleteBtn = document.querySelectorAll("[data-delete]");
        $memoInp = document.querySelectorAll("[data-memoInp]");
        $price = document.querySelectorAll("[data-price]");
        $qua = document.querySelectorAll("[data-qua]");
        $dis = document.querySelectorAll("[data-dis]");
        $cons = document.querySelectorAll("[data-cons]");
    };

    // メモ追加
    $addBtn.addEventListener("click", () => {
        let $lastTr = $table.lastElementChild.lastElementChild;
        const $cloneTr = $lastTr.cloneNode(true);
        $table.lastElementChild.insertBefore($cloneTr, null);
        dataUpDate();
        $lastTr = $table.lastElementChild.lastElementChild;
        $lastTr.querySelector("[data-mer]").value = "";
        $lastTr.querySelector("[data-price]").value = "";
        $lastTr.querySelector("[data-qua]").value = 1;
        $lastTr.querySelector("[data-dis]").value = "";
        $lastTr.querySelector("[data-cons]").value = 
        $lastTr.previousElementSibling.querySelector("[data-cons]").value;
    });

    // メモ削除
    addEventListener("click", (e) => {
        dataUpDate();
        for (let i = 0; i < $deleteBtn.length; i++) {
            if (e.target === $deleteBtn[i] && !($memoInp.length === 1)) {
                $memoInp[i].remove();
                dataUpDate();
            }
        }
    });

    $calcBtn.addEventListener("click", () => {
        let mersPrice = [];
        let resultPrice;
        dataUpDate();
        for (let i = 0; i < $price.length; i++) {
            if (!($price[i].value === "")) {
                resultPrice = $price[i].value * $qua[i].value;
                if (!($dis[i].value === "")) {
                    resultPrice = resultPrice * ((100 - $dis[i].value) * 0.01);
                }
                if ($cons[i].value === "eight") {
                    mersPrice.push(resultPrice * 1.08);
                } else if ($cons[i].value === "ten") {
                    mersPrice.push(resultPrice * 1.1);
                } else if ($cons[i].value === "not") {
                    mersPrice.push(resultPrice);
                }
            }
        }
        $calcResult.textContent = Math.floor(mersPrice.reduce((x, y) => {
            return x + y;
        })) + "円";
    });

})();