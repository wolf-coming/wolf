(function () {
  window.addEventListener('load', function () {
    // 隨機用陣列 10筆資料，對應下方randomName 隨機
    let propsAry = [
      'grass1',
      'grass1',
      'grass1',
      'grass1',
      'grass1',
      'grass2',
      'grass2',
      'grass2',
      'grass3',
      'grass4',
    ];

    const clickItem = document.getElementsByName('click_item'); // 用來選取地板區塊
    const randomItem = document.querySelector('.random_item'); //用來選取左側單一框
    let randomName = propsAry[Math.floor(Math.random() * 10)]; // 隨機物品 目前 10筆 ，需與陣列propsAry對應相同筆數
    // 若隨機有值則將'使用道具' 放進左側單一框框，否則給一個預設地板
    if (randomName) {
      randomItem.classList.add(randomName);
    } else {
      randomItem.classList.add(grass1);
    }

    //將隨機到的道具經由點擊放進地板內
    clickItem.forEach(function (value) {
      value.addEventListener('click', function () {
        // 判斷data-status = 0 且 有隨機道具時執行下面程式
        if (value.dataset.status == 0 && randomName) {
          value.classList.add(randomName); // 給地板道具
          randomItem.classList.remove(randomName); // 清除左側單一框'使用道具'
          randomName = propsAry[Math.floor(Math.random() * 10)]; // 隨機物品一個新的'使用道具' 目前 10筆 ，需與陣列propsAry對應相同筆數
          randomItem.classList.add(randomName); // 將新'使用道具' 放進左側單一框框
          value.dataset.status = 1; // 將狀態碼改成一，避免重複點擊
        }
      });
    });
  });

  // 宣告與CSS相通物件，物品->物品等級->物品名稱->'class'
  let levelObj = {
    grave: {
      level1: {
        name: 'grave1',
      },
      level2: {
        name: 'grave2',
      },
      level3: {
        name: 'grave3',
      },
    },
    grass: {
      level1: {
        name: 'grass1',
      },
      level2: {
        name: 'grass2',
      },
      level3: {
        name: 'grass3',
      },
      level4: {
        name: 'grass4',
      },
    },
    wolf: {
      level1: {
        name: 'wolf',
      },
      level2: {
        name: 'super wolf',
      },
      level3: {
        name: 'big wolf',
      },
    },
  };
})();
