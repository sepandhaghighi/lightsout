# Lights Out

----------		

<html>
<body>
<style>
button {
    display: inline;
    margin: 7px;
    margin-bottom: 5px;
    position: relative;
    height: 45px;
    width: 170px;
    padding: 5px 5px;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 2px;
    color: #383736;
    border: 2px #383736 solid;
    border-radius: 4px;
    text-transform: uppercase;
    outline: 0;
    overflow: hidden;
    background: none;
    z-index: 1;
    cursor: pointer;
    transition: 0.08s ease-in;
    -o-transition: 0.08s ease-in;
    -ms-transition: 0.08s ease-in;
    -moz-transition: 0.08s ease-in;
    -webkit-transition: 0.08s ease-in;
}

.reset {
    -webkit-transition: all 150ms cubic-bezier(0.445, 0.050, 0.550, 0.950);
}
.reset:before {
    position: absolute;
    content: "";
    background: url(https://f.cl.ly/items/3H3A0D1N281a2T280F3o/heist.svg) no-repeat center center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    -webkit-transition: all 500ms cubic-bezier(0.230, 1.000, 0.320, 1.000);
}
.reset:after {
    content: "";
    position: absolute;
    background: #202026;
    bottom: 0;
    left: 0;
    right: 0;
    top: 100%;
    z-index: -2;
    -webkit-transition: all 500ms cubic-bezier(0.230, 1.000, 0.320, 1.000);
}
.reset:hover {
    color: white;
}
.reset:hover:before {
    opacity: .8;
}
.reset:hover:after {
    top: 0;
}
a:hover{
text-decoration:none;
};
</style>
<div align="center">
<button class="reset"><a href="http://www.lightsout.ir">LETS PLAY!</a></button>
<button class="reset"><a href="http://www.lightsout.ir/help.html">HELP</a></button>
<button class="reset"><a href="http://www.lightsout.ir/donate.html">SUPPORT</a></button>
</div>
<p align="center">
  <img src="http://www.lightsout.ir/images/help.gif" alt="Lights Out Animation">
</p>
<p align="center">
   Simple Game Just For Fun :bowtie::see_no_evil:
</p>
</body>
</html>