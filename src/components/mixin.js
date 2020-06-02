export const touch = {
    directives: {
        'touch': {
            bind: (el, binding) => {
                let windowHeight = window.screen.height;
                let height;

                if (binding.arg == 'touch') {

                } else if (binding.arg == 'pullToFefresh') {

                } else if (binding.arg == 'pullOnLoading') {

                }
            }
        }
    }
};