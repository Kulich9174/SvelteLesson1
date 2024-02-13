<script>
	export let name;


	import MainSlide from "./components/MainSlideComponent/MainSlide.svelte";
	import RedButton from "./components/ComponentEvent/RedButton.svelte";
	import Inputs from "./components/Inputs/Inputs.svelte";
	import Outer from "./components/ComponentEvent/Outer.svelte";
	
	const audio = new Audio();
	// audio.src = horn;

	function AudioOn(){
		audio.load();
		audio.play();
	}// запуск аудио по нажатию кнопки

	function handleMessage (event){
		alert(event.detail.text);
	} // прокидывание сообщения

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

</style>