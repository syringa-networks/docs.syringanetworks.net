<script>
export default {
	directives: {
		infocus: {
			inserted: (el, binding) => {
				const f = () => {
					const rect = el.getBoundingClientRect();
					const inView =
						rect.width > 0 &&
						rect.height > 0 &&
						rect.top >= 0 &&
						rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
					if (inView) {
						el.classList.add(binding.value);
						window.removeEventListener('scroll', f);
					}
				};
				window.addEventListener('scroll', f);
				f();
			}
		}
	}
};
</script>
