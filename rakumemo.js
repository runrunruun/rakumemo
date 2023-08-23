(() => {

    // データセット
    const $addBtn = document.querySelector("[data-addBtn]");
    const $table = document.getElementById("table");
    const $calcBtn = document.querySelector("[data-calcBtn]");
    const $calcResult = document.querySelector("[data-calcResult]");
    const $saveBtn = document.querySelector("[data-saveBtn]");
    const $loadBtn = document.querySelector("[data-loadBtn]");
    const $deleteBtnCheck = document.querySelector("[data-deleteCheck]");
    const $changeContents = document.querySelector("[data-changeContents]");
    const $changeCheck = document.querySelector("[data-changeCheck]");
    const $changeInp = document.querySelector("[data-changeInp]");
    const $changeResult = document.querySelector("[data-changeCalcResult]");
    let $deleteBtn = document.querySelectorAll("[data-delete]");
    let $memoInp = document.querySelectorAll("[data-memoInp]");
    let $mer = document.querySelectorAll("[data-mer]");
    let $price = document.querySelectorAll("[data-price]");
    let $qua = document.querySelectorAll("[data-qua]");
    let $dis = document.querySelectorAll("[data-dis]");
    let $cons = document.querySelectorAll("[data-cons]");

    const addMemo = () => {
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
    };

    const deleteMemo = () => {
        dataUpDate();
        $table.lastElementChild.lastElementChild.remove();
        dataUpDate();
    };

    // データ更新
    const dataUpDate = () => {
        $deleteBtn = document.querySelectorAll("[data-delete]");
        $memoInp = document.querySelectorAll("[data-memoInp]");
        $mer = document.querySelectorAll("[data-mer]");
        $price = document.querySelectorAll("[data-price]");
        $qua = document.querySelectorAll("[data-qua]");
        $dis = document.querySelectorAll("[data-dis]");
        $cons = document.querySelectorAll("[data-cons]");
    };

    // メモ追加
    $addBtn.addEventListener("click", () => {
        addMemo();
    });

    // メモ削除
    addEventListener("click", (e) => {
        dataUpDate();
        for (let i = 0; i < $deleteBtn.length; i++) {
            if (e.target === $deleteBtn[i] && !($memoInp.length === 1)) {
                if ($deleteBtnCheck.checked) {
                    let deleteCheckFlag = window.confirm("削除してよろしいですか？");
                    if (deleteCheckFlag) {
                        $memoInp[i].remove();
                    }
                } else {
                    $memoInp[i].remove();
                }
            }
        }
    });

    // おつりモードON/OFF
    $changeCheck.addEventListener("click", () => {
        if ($changeCheck.checked) {
            $changeContents.style.display = "block";
        } else {
            $changeContents.style.display = "none";
        }
    });

    // 計算
    $calcBtn.addEventListener("click", () => {
        let mersPrice = [];
        let resultPrice;
        let resultSum;
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
        resultSum = Math.floor(mersPrice.reduce((x, y) => {
            return x + y;
        }))
        $calcResult.textContent = resultSum + "円";
        if ($changeCheck.checked && !($changeInp.value === "")) {
            $changeResult.textContent = parseInt(resultSum - $changeInp.value) + "円";
        }
    });

    // ブラウザに保存
    $saveBtn.addEventListener("click", () => {
        dataUpDate();
        let datasArr = [];
        for (let i = 0; i < $memoInp.length; i++) {
            datasArr.push({
                mer: $mer[i].value,
                price: $price[i].value,
                qua: $qua[i].value,
                dis: $dis[i].value,
                cons: $cons[i].value
            })
        }
        localStorage.setItem("datas", JSON.stringify(datasArr));
    });

    // ブラウザからロード
    $loadBtn.addEventListener("click", () => {
        dataUpDate();
        let loadValue = JSON.parse(localStorage.getItem("datas"));
        while (!($memoInp.length === 1)) {
            deleteMemo();
        }
        for (let i = 0; i < loadValue.length - 1; i++) {
            addMemo();
        }
        dataUpDate();
        for (let i = 0; i < $memoInp.length; i++) {
            $mer[i].value = loadValue[i].mer
            $price[i].value = loadValue[i].price
            $qua[i].value = loadValue[i].qua
            $dis[i].value = loadValue[i].dis
            $cons[i].value = loadValue[i].cons
        }
    })

})();