(function () {
  window.addEventListener('load', function () {
    // 宣告與CSS相通物件，物品->物品等級->物品名稱->'class'
    // 隨機用陣列，數量100個
    let wolf_ary = [];
    // 機率區 40% 30% 20% 10%
    let wolf_amount100 = 100;
    let wolf_amount40 = (100 * 40) / 100;
    let wolf_amount30 = (100 * 30) / 100;
    let wolf_amount20 = (100 * 20) / 100;
    let wolf_amount10 = (100 * 10) / 100;
    if (
      wolf_amount100 ===
      wolf_amount40 + wolf_amount30 + wolf_amount20 + wolf_amount10
    ) {
      for (let i = 1; i <= wolf_amount40; i++) {
        wolf_ary.push('grass01');
      }
      for (let i = 1; i <= wolf_amount30; i++) {
        wolf_ary.push('grass02');
      }
      for (let i = 1; i <= wolf_amount20; i++) {
        wolf_ary.push('grass03');
      }
      for (let i = 1; i <= wolf_amount10; i++) {
        wolf_ary.push('grass04');
      }
    } else {
      console.log('機率總和大於100%');
    }

    console.log(wolf_ary);
    /* 點擊新增道具 */
    const g_click = document.getElementsByName('click_item');
    const random_item = document.querySelector('.random_item');
    // 隨機物品 目前 grass, wolf
    let random_name = Math.floor(Math.random() * 2) + 1;
    // 隨機物品等級 目前 1~4
    let random_level = Math.floor(Math.random() * 4) + 1;
    //  選取相對應物品
    if (random_name) {
      switch (random_name) {
        case 1:
          random_name = levelObj.grass;
          break;
        case 2:
          random_name = levelObj.wolf;
          break;
      }
    }
    //  選取相對應物品等級
    if (random_name && random_level) {
      switch (random_level) {
        case 1:
          random_level = random_name.level1.name;
          break;
        case 2:
          random_level = random_name.level2.name;
          break;
        case 3:
          random_level = random_name.level3.name;
          break;
        case 4:
          random_level = random_name.level4.name;
          break;
      }
    }

    if (random_name && random_level) {
      // 將'使用道具' 放進左側單一框框
      random_item.classList.add(random_level);
    } else {
      random_item.classList.add(levelObj.grass.level1.name);
    }

    // 將隨機到的道具經由點擊放進地板內
    // g_click.forEach(function (value) {
    //   value.addEventListener('click', function () {
    //     // 切割class 查看目前有幾個class
    //     let class_grass = value.className.split(' ')
    //     // 判斷如果有第二個class則不執行下面動作
    //     if (!class_grass || class_grass.length <= 1) {
    //       // 給地板道具
    //       value.classList.add('grass0' + random)
    //       // 清除'使用道具'
    //       random_item.classList.remove('grass0' + random)

    //       // 隨機一個新的'使用道具' 1~4階
    //       random = Math.floor(Math.random() * 4) + 1
    //       // 將新'使用道具' 放進左側單一框框
    //       random_item.classList.add('grass0' + random)
    //     }
    //   })
    // })
  });
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
