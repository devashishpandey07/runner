var bg,bgimg
var runner,runnerright,runnerjump
var platform,platformimg,platformgroup
var coin,coinimg,coingroup
var laser,laserimg,lasergroup
var rock,rockimg,rockgroup
var gem,gemimg,gemgroup
var gamestate="play"
var score=0
var life=3
var invisibleground

function preload(){
    bgimg=loadImage("assets/bg.png")
    runnerright=loadAnimation("assets/boy1.png","assets/boy2.png","assets/boy3.png","assets/boy4.png","assets/boy5.png")
    runnerjump=loadImage("assets/boy3.png")
    platformimg=loadImage("assets/platform.png")
    coinimg=loadAnimation("assets/c1.png","assets/c2.png","assets/c3.png","assets/c4.png","assets/c5.png","assets/c6.png","assets/c1.png",)
    laserimg=loadImage("assets/laser.png")
    rockimg=loadImage("assets/rock.png")
    gemimg=loadImage("assets/gem.png")

}

function setup(){
    createCanvas(1400,700)
    bg=createSprite(700,350,1400,700)
    bg.addImage(bgimg)
    
    runner=createSprite(35,500,60,60)
    runner.addAnimation("running",runnerright)
    runner.addImage("runnerjump",runnerjump)
    runner.scale=0.5
    runner.debug=false
    invisibleground=createSprite(20,560,50000,20)
    invisibleground.visible=false


    platformgroup=new Group()
    coingroup=new Group()
    lasergroup=new Group()
    rockgroup=new Group()
    gemgroup=new Group()




}

function draw(){
    background(0)
    drawSprites()
    if (gamestate==="play"){
        camera.position.x=runner.x
        camera.position.y=runner.y
        if (keyDown("right")){
            runner.x+=5
            runner.changeImage("running")
        }

        if (keyDown("space")){
            runner.velocityY=-10
            runner.changeImage("runnerjump")

        }
        runner.velocityY+=0.8
        bg.velocityX=-2
        if (bg.x<0){
            bg.x=700
        }
        if (platformgroup.isTouching(runner)){
            runner.velocityY=0
            runner.collide(platformgroup)
        }
        coingroup.isTouching(runner,destroycoins)
        gemgroup.isTouching(runner,destroygems)
        rockgroup.isTouching(runner,destroyrocks)
        if (lasergroup.isTouching(runner)){
            gamestate="end"

        }
        spawnplatform()
        spawngems()
        spawnrock()
        spawnlaser()


    }

    if (gamestate==="end"){
        runner.destroy()
        platformgroup.destroyEach()
        coingroup.destroyEach()
        lasergroup

    }

    textSize(20)
    strokeWeight(2)
    fill("black")
    text("Score:"+score,runner.x-120,runner.y)
    text("Life:"+life,runner.x-120,runner.y+50)
    runner.collide(invisibleground)
}

        function spawnplatform(){
            if (frameCount%300===0){
                platform=createSprite(1400,200,50,50)
                platform.addImage(platformimg)
                platform.y=random(200,500)
                platform.velocityX=-2
                platform.scale=0.5
                platform.lifetime=1400
                platform.debug=false
                platform.setCollider("rectangle",0,0,platform.width,100)
                runner.depth=platform.depth
                runner.depth+=1
                

                coin=createSprite(platform.x,platform.y-50)
                coin.addAnimation("coin",coinimg)
                coin.scale=0.5
                coin.velocityX=-2
                coin.lifetime=1400/2
                coingroup.add(coin)
                platformgroup.add(platform)
                }
        }
        function spawngems(){
            if (frameCount%500===0){
                gem=createSprite(1400,random(200,500))
                gem.addImage(gemimg)   
                gem.velocityX=-2
                gem.scale=0.2
                gem.lifetime=1400/2
                gemgroup.add(gem)
            }
        }
        function spawnrock(){
            if (frameCount%400===0){
                rock=createSprite(1400,random(450,550))
                rock.addImage(rockimg)
                rock.velocityX=-2
                rock.scale=0.4
                rock.lifetime=1400/2
                rockgroup.add(rock)
            }
        }
        function spawnlaser(){
            if (frameCount%200===0){
                laser=createSprite(1400,random(250,550))
                laser.addImage(laserimg)
                laser.velocityX=random(-12,-6)
                laser.scale=0.2
                laser.lifetime=1400/laser.velocityX
                lasergroup.add(laser)
            }
        }
        function destroycoins(coin){
            coin.destroy()
            score+=5
        }
        function destroygems(gem){
            gem.destroy()
            score+=10
        }
        function destroyrocks(rock){
            rock.destroy()
            score-=3
            life-=1
        }