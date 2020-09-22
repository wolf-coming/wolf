(function(){
    window.addEventListener('load',function(){

        /* 點擊新增道具 */
        const g_click = document.querySelectorAll('.wrap_box .item')
        const random_item = document.querySelector('.random_item')

            // 隨機一個'使用道具' 1~4階
        let random = Math.floor(Math.random()*4)+1
            // 將'使用道具' 放進左側單一框框
        random_item.classList.add('grass0'+random)


            // 將隨機到的道具經由點擊放進地板內
        g_click.forEach(function(value){
            value.addEventListener('click',function(){
                
                // 切割class 看是否有第二個class
                let class_grass = value.className.split(' ')[1]
                // 判斷如果有第二個class則不執行下面動作
                if(!class_grass || class_grass == undefined){
                    // 給地板道具
                    value.classList.add('grass0'+random)
                    // 清除'使用道具'
                    random_item.classList.remove('grass0'+random)

                    // 隨機一個新的'使用道具' 1~4階
                    random = Math.floor(Math.random()*4)+1
                    // 將新'使用道具' 放進左側單一框框
                    random_item.classList.add('grass0'+random)

                    /* 測試 */
                }


                
                
                
            })
        })













    })
})()