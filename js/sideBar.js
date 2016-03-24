(function(){
    var Sidebar = function(eId,closeBarId){
        
        var that = this;
        this.menubar = new Menubar();
        this.state = 'opened';
        this.el = document.getElementById(eId ||'sideBar');
        this.closeBarE1 = document.getElementById(closeBarId || 'closeBar');
        this.el.addEventListener('click',function(event){
            console.log(event)
            if(event.target !== this.el){
                that.triggerSwich();
            };
        })
        console.log(this)
    };
    Sidebar.prototype.close = function(){
        //console.log('关闭');
        this.el.className = 'sidebar-move-left';
        this.closeBarE1.className = 'closeBar-move-right';
        this.state = 'closed';
    };
    Sidebar.prototype.open = function(){
        //console.log('打开');
        this.el.className = 'sidebar-move-right';
        this.closeBarE1.className = 'closeBar-move-left'
        this.state = 'opened';
    };
    Sidebar.prototype.triggerSwich = function(){
        if(this.state === 'opened'){
            this.close();
        }else{
            this.open();
        };
    };
    var sidebar = new Sidebar();
    function Menubar(){
        this.el = document.querySelector('#sideBar ul');
        this.state = 'allClosed';//hasopened
        this.el.addEventListener('click',function(e){
            e.stopPropagation();
        });
        var that =this;
        this.currentOpenedMenuContent = null;
        this.menuList = document.querySelectorAll('#sideBar ul>li');
        for(var i = 0;i<this.menuList.length;i++){
            this.menuList[i].addEventListener('click',function(e){
                var menuContentE1 = document.getElementById(e.currentTarget.id + '-content');
                //console.log(menuContentE1);
                if(that.state==='allClosed'){
                    //console.log(menuContentE1.id);
                    menuContentE1.style.top = '0';
                    menuContentE1.style.left = '-85px';
                    menuContentE1.className = 'nav-content';
                    menuContentE1.classList.add('menuContent-move-right');
                    that.state = 'hasOpened';
                    that.currentOpenedMenuContent = menuContentE1;
                }else{
                    //console.log('关闭'+that.currentOpenedMenuContent.id);
                    that.currentOpenedMenuContent.className = 'nav-content';
                    that.currentOpenedMenuContent.style.top = '0';
                    that.currentOpenedMenuContent.style.left = '35px';
                    that.currentOpenedMenuContent.classList.add('menuContent-move-left');
                    //console.log(menuContentE1.id);
                    menuContentE1.className = 'nav-content';
                    menuContentE1.style.top = '250px';
                    menuContentE1.style.left = '35px';
                    menuContentE1.classList.add('menuContent-move-up');
                    that.state = 'hasOpened';
                    that.currentOpenedMenuContent = menuContentE1;
                }
            });
        }
        this.menuContentList = document.querySelectorAll('.nav_con_close');
        for(i=0;i<this.menuContentList.length;i++){
            this.menuContentList[i].addEventListener('click',function(e){
                var menuContent = e.currentTarget
                .parentNode;
                menuContent.className = 'nav-content';
                menuContent.style.top = '0';
                menuContent.style.left = '35px';
                menuContent.classList.add('menuContent-move-left');
                that.state = 'allClosed';
            })
        }
    };
}())