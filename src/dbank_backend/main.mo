import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor {
  stable var currentValue: Float = 300;

  stable var startTime = Time.now();

  Debug.print(debug_show(startTime));

  Debug.print("Hi");

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.0001 ** Float.fromInt(timeElapsedS));
 };


  // Debug.print("Hi!");

  public func topUp(amount: Float) {
    currentValue +=amount;
    Debug.print(debug_show(currentValue));
  };

  public func withDraw(amount: Float) {
    let tmpValue: Float = currentValue - amount;

    if (tmpValue >=0) {
      currentValue -=amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Amount is greater than currentValue.");
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

}