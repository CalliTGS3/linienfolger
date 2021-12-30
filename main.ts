input.onButtonPressed(Button.A, function () {
    fahren = true
})
input.onButtonPressed(Button.B, function () {
    fahren = false
})
let hell_rechts = 0
let hell_links = 0
let fahren = false
let anzeige = true
let weissschwellwert = 300
let motorzeit = 30
let kurvenzeit = 30
let langsam = 5
let schnell = 18
let motorschwellwertA = 30
let motorschwellwertB = 30
pins.setPull(DigitalPin.C16, PinPullMode.PullNone)
pins.setPull(DigitalPin.C17, PinPullMode.PullNone)
basic.pause(500)
motors.dualMotorPower(Motor.AB, 0)
basic.forever(function () {
    if (fahren) {
        hell_links = pins.analogReadPin(AnalogPin.C17)
        hell_rechts = pins.analogReadPin(AnalogPin.C16)
        if (hell_links < weissschwellwert && hell_rechts < weissschwellwert) {
            motors.dualMotorPower(Motor.B, Math.map(schnell, 0, 100, motorschwellwertA, 100))
            motors.dualMotorPower(Motor.A, Math.map(schnell, 0, 100, motorschwellwertB, 100))
            basic.pause(motorzeit)
        }
        if (hell_links >= weissschwellwert && hell_rechts < weissschwellwert) {
            motors.dualMotorPower(Motor.B, Math.map(schnell, 0, 100, motorschwellwertB, 100))
            motors.dualMotorPower(Motor.A, Math.map(langsam, 0, 100, motorschwellwertA, 100))
            basic.pause(kurvenzeit)
        }
        if (hell_rechts >= weissschwellwert && hell_links < weissschwellwert) {
            motors.dualMotorPower(Motor.A, Math.map(schnell, 0, 100, motorschwellwertA, 100))
            motors.dualMotorPower(Motor.B, Math.map(langsam, 0, 100, motorschwellwertB, 100))
            basic.pause(kurvenzeit)
        }
        motors.dualMotorPower(Motor.AB, 0)
    } else {
        motors.dualMotorPower(Motor.AB, 0)
    }
})
basic.forever(function () {
    if (anzeige) {
        if (fahren) {
            basic.showArrow(ArrowNames.South)
        } else {
            basic.showIcon(IconNames.No)
        }
        basic.pause(200)
        basic.clearScreen()
        basic.pause(200)
    }
})
