<template>
<div>
  <header>
    <h1 class="tit_head">Canvan Board</h1>
  </header>
  <main>
    <article>
      <h2 class="screen_out">본문</h2>
      <section>
        <div id="app">
          <router-view/>
        </div>
      </section>
    </article>
  </main>
</div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.screen_out {
    overflow: hidden;
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    text-indent: -9999px;
}
.tit_head {
  padding: 14px 20px;
  text-align: center;
  color: #fff;
background-image: -webkit-linear-gradient(left, #69ADD9, #76BD9B);
    background-image: -moz-linear-gradient(left, #69ADD9, #76BD9B);
    background-image: -o-linear-gradient(left, #69ADD9, #76BD9B);
    background-image: linear-gradient(to right, #69ADD9, #76BD9B);
}
body {
    background: #fff;
    font-size: 14px;
    color: #333;
}

body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,textarea,p,blockquote,th,td,input,select,textarea,button {margin:0;padding:0}
fieldset,img {border:0 none}
ul,ol{list-style:none}
blockquote, q {quotes: none}
input,select,textarea,button {vertical-align:middle}
button {border:0 none;background-color:transparent;cursor:pointer}
body,th,td,input,select,textarea,button {font-size:18px;line-height:1.2;font-family:sans-serif;color:#000} /* color값은 디자인가이드에 맞게사용 */
a {color:#1122cc;text-decoration:none}
a:active, a:hover {text-decoration:underline}
address,caption,cite,code,dfn,em,var {font-style:normal;font-weight:normal}
hr {display:none}
article, aside, details, figcaption, figure, footer, header, hgroup, nav, section, main {display:block}
audio, canvas, video {display:inline-block;*display:inline;*zoom:1}
input::-ms-clear {display:none}
header,article,aside,footer,section{display:block}

.wrap_btn {
  text-align: right;
}
 button[class^="btn_"] {
  display: inline-block;
  padding: 8px 15px 7px;
  margin: 0 0 10px 5px;
  border: 1px solid #cdcdcd;
  line-height: 18px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  vertical-align: top;
  text-align: center;
  }

  button[class*=emph] {
    color: #fff;
    border: 0 none;
  }

  .emph1 {
    background: #118EFF;
  }

  .emph2 {
    background: #FC4C4E;
  }
  .fc_emph2 {
    color: #FC4C4E;
    font-weight: bold;
  }
  .area_main {
  width: 798px;
  padding: 20px 30px;
  margin: 0 auto;
}
[class^=layer] {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
  }
   .inner {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 698px;
    padding: 40px;
    border: 3px solid #e3e3e3;
    border-radius: 4px;
    background: #fff;
    transform: translate(-50%,-50%);
  }
</style>
