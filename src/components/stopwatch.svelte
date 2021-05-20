<svelte:options tag="svelte-timer" />

<script lang="ts">
    let startTime: any = null
    let isRunning = false
    let timeElapsed = 0
    let pause = true
    let pTime = 0
    let rafHandle = 0

    function raf(timestamp: number){
        if(!startTime) startTime = timestamp

        if(isRunning && !pause){
            timeElapsed = (timestamp - startTime) - pTime
            requestAnimationFrame(raf)
        }else if(isRunning && pause) {
            pTime = (timestamp - startTime) - timeElapsed
            timeElapsed = (timestamp - startTime) - pTime
            requestAnimationFrame(raf)
         }
    }

    function start(){
        isRunning = true
        pause = false
        rafHandle = requestAnimationFrame(raf)
    }

    function stop(){
        pause = true
    }

    function reset() {
        isRunning = false
        pause = true
        startTime = null
        timeElapsed = 0
        pTime = 0
        cancelAnimationFrame(rafHandle)
    }


    $: text = `${String((timeElapsed / 1000 / 60)>>0).padStart(2, '0')}:${String(((timeElapsed / 1000 )>>0 )% 60).padStart(2, '0')}:${String(timeElapsed % 1000 >> 0).padStart(3, '0').slice(0,-1)} `


</script>

<style lang="scss">
$button-szie: 40px;
$panel-size: 170px;
:host {
    display: inline-block;
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.panel {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    align-items: center;
    height: $panel-size;
    width: $panel-size;
    border: 1px solid #2c3347;
    border-radius: 50%;
    .time {
        font-family: "Roboto Mono", monospace;
        font-weight: 400;
        font-size: 28px;
    }
}

.actions {
    display: flex;
    .button {
        height: $button-szie;
        width: $button-szie;
        border-radius: 50%;
        display:flex;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        margin: 0 10px;
        div {
            cursor: pointer;
        }
        .play {
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-left: 12px solid #000;
            border-bottom: 8px solid transparent;
        }
        .pause {
            width: 4px;
            height: 16px;
            border-right: 4px solid #000;
            border-left: 4px solid #000;
        }
        .resume {
            width: 16px;
            height: 16px;
            border:  1px solid #000;
        }
    }
}
</style>

<div class="container">
    <div class="panel">
        <span class="time">{text}</span>
    </div>
    <div class="actions">
        {#if pause == true}
            <div class="button" on:click="{start}">
                <div class="play" ></div>
            </div>
        {:else}
            <div class="button" on:click="{stop}">
                <div class="pause"></div>
            </div>
        {/if}
        <div class="button" on:click="{reset}">
            <div class="resume"></div>
        </div>
    </div>
</div>