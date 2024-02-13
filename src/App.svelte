<script>
	export let name;
	import { onMount } from 'svelte';


	import MainSlide from "./components/MainSlideComponent/MainSlide.svelte";
	import RedButton from "./components/ComponentEvent/RedButton.svelte";
	import Inputs from "./components/Inputs/Inputs.svelte";
	import Outer from "./components/ComponentEvent/Outer.svelte";
	import {paint} from './components/Lifecycle/onMount/gradient';
	
	const audio = new Audio();
	// audio.src = horn;

	function AudioOn(){
		audio.load();
		audio.play();
	}// запуск аудио по нажатию кнопки

	function handleMessage (event){
		alert(event.detail.text);
	} // прокидывание сообщения

	onMount(() => {
		const canvas = document.querySelector('canvas');
		const context = canvas.getContext('2d');

		requestAnimationFrame(function loop(t) {
			requestAnimationFrame(loop);
			paint(context, t);
		});
	});
</script>

<main>
	<div class="header">
		<h1>Hello {name}!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	</div>
	
	<MainSlide/>
	<RedButton on:click={AudioOn}/>
	<Outer on:message={handleMessage} />
	<h2>Inputs</h2>
	<Inputs/>
	<canvas
	width={32}
	height={32}
/>
</main>

<style>
	main {
		
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	.header{
		text-align: center;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	canvas {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #666;
		mask: url(./components/Lifecycle/onMount/logo.svg) 50% 50% no-repeat;
		mask-size: 60vmin;
		-webkit-mask: url(./components/Lifecycle/onMount/logo.svg) 50% 50% no-repeat;
		-webkit-mask-size: 60vmin;
	}
</style>