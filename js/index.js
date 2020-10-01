const FLOOR_X = 6; // 橫格子數量
const FLOOR_Y = 6; // 縱格子數量
let util = null; // 工具包
let listenEvent = null; // 監聽&動作事件
let randomPropsAry = new Array(); // 素材隨機陣列(把使用到的素材物件,依照計算的比例丟入)
let propsObj = new Object(); // 各個類型的素材資料
let floorObj = new Object(); // 所有可操作地板素材

window.addEventListener('load', init, false);

// 初始化
function init() {
    util = new Util(); // 工具
    listenEvent = new ListenEvent(); // 監聽&動作事件
    listenEvent.addHyperLink(); // 建立監聽事件(靜態)
    buildPropsData(); // 建構素材資料
    buildFloorData(); // 建構地板資料
    setRandomFloor(); // 產生隨機地圖
    setView(); // 產生畫面
    setNextProps(); //產生新'下一格'資料
}
// 建構素材資料
function buildPropsData() {
    /*
    { 
        物品類型: { 
            物品階級: { 
                level: '階級',
                type: '類型',
                name: '物品名稱',
                remark:'備註',
            }
        }
    }
    */
    propsObj = {
        grave: {
            level1: {
                level: '1',
                type: 'grave',
                className: 'grave1',
                remark: '墓碑',
            },
            level2: {
                level: '2',
                type: 'grave',
                className: 'grave2',
                remark: '教堂',
            },
        },
        grass: {
            level1: {
                level: '1',
                type: 'grass',
                className: 'grass1',
                remark: '草地',
            },
            level2: {
                level: '2',
                type: 'grass',
                className: 'grass2',
                remark: '樹叢',
            },
            level3: {
                level: '3',
                type: 'grass',
                className: 'grass3',
                remark: '樹木',
            },
            level4: {
                level: '4',
                type: 'grass',
                className: 'grass4',
                remark: '房子',
            },
        },
        wolf: {
            level1: {
                level: '1',
                type: 'wolf',
                className: 'wolf',
                remark: '狼人',
            },
            level2: {
                level: '2',
                type: 'wolf',
                className: 'super_wolf',
                remark: '超人狼人',
            },
            level3: {
                level: '3',
                type: 'wolf',
                className: 'big_wolf',
                remark: '大野狼',
            },
        },
    };
}
// 建構地板資料
function buildFloorData() {
    /*
    { 
        X座標: { 
            Y座標: { 
                posX: '地板所在X',
                posY: '地板所在Y',
                level: '素材階級',
                type: '素材類型',
                id: '物件id',
                dom: '物件',
            }
        }
    }
    */
    let count = 1;
    for (let i = 0; i < FLOOR_X; i++) {
        floorObj[i] = new Object();
        for (let k = 0; k < FLOOR_Y; k++) {
            let id = 'item' + (count < 10 ? '0' + count : count); // 小於10補0
            let dom = document.getElementById(id);
            let level = 0;
            let type = '';
            floorObj[i][k] = {
                posX: i,
                posY: k,
                level: level,
                type: type,
                id: id,
                dom: dom,
            };
            // 交給建構時再產生 data-
            dom.dataset.level = level;
            dom.dataset.type = type;
            dom.dataset.posX = i;
            dom.dataset.posY = k;
            count++;
        }
    }
}
// 產生隨機地圖
function setRandomFloor() {
    // 可以在這邊寫入初始地圖 分難度之類的 ...
    // ------ start ------
    // 目前先隨機產生5格地板(重複跳過不回補)
    for (let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * FLOOR_X); // 隨機取X
        let y = Math.floor(Math.random() * FLOOR_Y); // 隨機取Y
        let randomNumber = Math.floor(Math.random() * util.getObjCount(propsObj.grass)) + 1; // 隨機草的階級
        let obj = propsObj.grass['level' + randomNumber];
        if (floorObj[x][y]['type'] == '') {
            floorObj[x][y]['type'] = obj.type;
            floorObj[x][y]['level'] = obj.level;
        }
    }
    // ------ end ------
}
// 產生畫面
function setView() {
    for (let i = 0; i < FLOOR_X; i++) {
        for (let k = 0; k < FLOOR_Y; k++) {
            let obj = floorObj[i][k];
            let dom = obj.dom;
            // 只有與原先不一樣的素材 才需要更新(以資料為主)
            if (floorObj[i][k]['type'] != dom.dataset.type && floorObj[i][k]['level'] != dom.dataset.level) {
                let props = propsObj[obj.type]['level' + obj.level];
                dom.dataset.type = props.type; // 給予dom當前賦予的類型
                dom.dataset.level = props.level; // 給予dom當前賦予的階級
                dom.classList.add(props.className); // 將新"使用素材" 放進'下一格'
            }
        }
    }
}
// 產生隨機素材
function setRandomProps() {
    let tmpAry = new Array();
    // 之後隨機算法可以寫在這邊
    // ------ start ------
    // 先隨便寫入10個
    for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random() * 4) + 1;
        let props = propsObj.grass['level' + random];
        tmpAry.push(props);
    }
    // ------ end ------
    randomPropsAry.length = 0; // 釋放記憶體並清空舊資料
    randomPropsAry = tmpAry;
}
// 產生新'下一格'資料
function setNextProps() {
    setRandomProps(); // 產生隨機素材
    let randomItem = document.querySelector('.random_item'); //用來選取'下一格'
    // 剛產生時沒有 data-type
    if (randomItem.dataset.type) {
        let className = propsObj[randomItem.dataset.type]['level' + randomItem.dataset.level].className;
        randomItem.classList.remove(className); // 清除'下一格'原先素材
    }
    let randomProps = randomPropsAry[Math.floor(Math.random() * randomPropsAry.length)]; // 從設定好的陣列素材裡隨機挑選物品
    randomItem.dataset.type = randomProps.type; // '下一格'類型
    randomItem.dataset.level = randomProps.level; // '下一格'階級
    randomItem.classList.add(randomProps.className); // 將隨機產生的素材放入'下一格'
}
// 合成邏輯判斷
function doEvolution(dom) {
    // 中心點
    let x = dom.dataset.posX;
    let y = dom.dataset.posY;
    // 所有資料
    // floorObj;
    // ------ start ------
    console.log('合成邏輯判斷');
    // 可以在這邊寫合成邏輯

    // ------ end ------
}
// 監聽&動作事件
function ListenEvent() {
    let self = this;
    //建立監聽事件(靜態)
    self.addHyperLink = function () {
        // 將所有地板設定監聽事件
        let clickItem = document.getElementsByName('click_item'); // 用來選取地板區塊
        clickItem.forEach(function (dom) {
            dom.addEventListener('click', self.doActionMap, false);
        });
    };
    // 點擊可操作地圖
    self.doActionMap = function (event) {
        let dom = event.target; // 點擊的地板document
        // 沒有點選過才能動作
        if (dom.dataset.type == '') {
            let randomItem = document.querySelector('.random_item'); // 用來選取'下一格'
            let randomProps = propsObj[randomItem.dataset.type]['level' + randomItem.dataset.level]; // 從'下一格'拿取素材
            floorObj[dom.dataset.posX][dom.dataset.posY]['type'] = randomProps.type; // 將地板類型資料替換掉
            floorObj[dom.dataset.posX][dom.dataset.posY]['level'] = randomProps.level; // 將地板階級資料替換掉
            doEvolution(dom); // 合成邏輯判斷
            setView(); // 產生畫面
            setNextProps(); //產生新'下一格'資料
        }
    };
}
// 工具
function Util() {
    let self = this;
    // 計算物件數量
    self.getObjCount = function (obj) {
        var out = 0;
        for (var key in obj) {
            out++;
        }
        return out;
    };
}
