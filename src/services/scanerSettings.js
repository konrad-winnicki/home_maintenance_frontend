import Quagga from "@ericblade/quagga2";

export function scanBarcode(function_changing_local_status) {
  Quagga.init(
    {
      numOfWorkers: navigator.hardwareConcurrency,
      inputStream: {
        name: "Live",
        type: "LiveStream",
        constraints: {
          width: 700,
          height: 700,
          // width: 300,
          //height: 300,
        },
        target: document.querySelector("#videoStream"),
      },
      frequency: 5,
      locator: {
        halfSample: true,
        patchSize: "large", // x-small, small, medium, large, x-large
      },
      decoder: {
        readers: ["ean_reader"],
      },
      locate: true,
    },
    function (err) {
      if (err) {
        return;
      }

      Quagga.onDetected((data) => {
        if (data && data.codeResult.decodedCodes) {
          console.log("a", data);
          console.log("b", data.codeResult.decodedCodes);
          console.log("c", data.barcodes);
          let code = data.codeResult.code;
          Quagga.offDetected();
          Quagga.stop();
          beep_sound();
          let comments = document.querySelector("#videoStream");
          setTimeout(() => {
            function_changing_local_status(code);
            comments.innerHTML = "";
          }, 110);
        }
      });
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    }
  );
}

export function stopScanning() {
  console.log("break scanning");
  Quagga.offDetected();
  Quagga.stop();
  let comments = document.querySelector("#videoStream");
  comments.innerHTML = "";
}

function beep_sound() {
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.value = 800;
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(function () {
    oscillator.stop();
  }, 100);
}


