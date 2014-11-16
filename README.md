# stickr.js

> jQuery plugin for sticky elements

## Introduction

styckr.js 는 스크롤 위치에 따라 엘리먼트가 윈도우의 뷰포트를 벗어날 경우, `position` 값을 `fixed`로 전환하여 위치를 고정하는 sticky element(흔히 기획자들이 얘기하는 "따라다니는 레이어")를 구현하는 [jQuery](http://jquery.com) 플러그인 입니다. 버전 1.7 이상의 jQuery 사용을 권장하며, Firefox, Chrome, Safari, IE7+ 브라우저와 호환됩니다.

## Demo
http://stickr.1upnote.com

## Download

[Bower](http://bower.io)를 사용하신다면 command line에서 아래의 명령어로 설치할 수 있습니다.

```
$ bower install stickr
```
직접 내려받아 사용하시길 원한다면 아래의 다운로드 링크를 클릭하거나 Release 페이지를 방문하여, 원하는 버전의 파일을 내려받으시면 됩니다.

 - [Download as tar.gz](https://github.com/woneob/stickr/zipball/master)
 - [Download as zip](https://github.com/woneob/stickr/tarball/master)


## Usage

jQuery와 stickr.js 소스를 `script` 태그를 이용하여 불러옵니다.

stickr.js는 jQuery 함수를 이용하는 플러그인이므로, jQuery 소스가 먼저 선언돼야 합니다.

```html
<script src="jquery.js"></script>
<script src="jquery.stickr.js"></script>
```

기본적인 HTML 형식은 별다른 규칙이 요구되지 않습니다.

단, 적용할 엘리먼트에 inline style 로 `top` 값을 지정을피하시고, 불가피하게 inline style이 필요하다면 `margin-top`을 이용하시기 바랍니다.

```html
<div id="container">
    <span class="stickr">Some text</span>
</div>
```

스크롤을 움직여 sticky 상태로 전환 될 때, 엘리먼트의 `position` 값은 `fixed`로 변경되므로 `float`과 같은 속성을 이용하여 레이아웃을 구성하지 마십시오.

만약 `float` 속성을 사용해야 한다면, 엘리먼트를 감싸는 wrapper 엘리먼트를 만들어 지정하세요.

```css
#container .stickr {
    width: 80px;
    height: 40px;
    background-color: #333;
}
```

상위 계층의 엘리먼트 중 `position` 속성값이 `relative`, `absolute` 혹은 `fixed`로 지정된 엘리먼트가 존재할 경우, 이 부모 엘리먼트의 영역 내에서만 fixed 값이 유지되고 그 이후부터는 `absolute` 상태로 전환되어 더는 화면에 고정되지 않습니다.

이는 fixed 된 엘리먼트로 인해 하단에 위치한 푸터나 콘텐츠가 가려지는 문제를 방지합니다.

```css
#container {
    position: relative; /* Set the parent container */
    width: 80px;
    height: 500px; /* Sticky area */
    background-color: #eee;
}

#container .stickr {
    width: 80px;
    height: 40px;
    background-color: #333;
}
```

만약 이러한 종료구간을 원치 않는다면 `data-stickr-stop` 속성과 함께 `false` 값을 추가하면 됩니다.

`data-stickr-stop` 속성은 필수 값이 아닙니다. `false`가 아닐 경우, `true`나 비어있는 값으로 지정할 필요가 없으니, 속성을 삭제하셔도 무방합니다.

```html
<div id="container">
    <span class="stickr" data-stickr-stop="false">Some text</span>
</div>
```

윈도우 뷰포트 상단과의 간격이 필요하면 `data-stickr-gap` 속성을 숫자 값과 함께 추가하세요. 숫자의 단위는 px 입니다.

`data-stickr-gap` 속성은 필수 값이 아닙니다. 간격이 필요 없으면, `0`이나 비어있는 값으로 지정할 필요가 없으니, 속성을 삭제하셔도 무방합니다.

```html
<div id="container">
    <span class="stickr" data-stickr-gap="10">Some text</span>
</div>
```

HTML과 CSS 설정이 완료되었다면 stickr를 호출합니다.

```js
$('.stickr').stickr();
```

## License

stickr.js 는 [MIT 라이센스](http://1up.mit-license.org/)를 따릅니다.
