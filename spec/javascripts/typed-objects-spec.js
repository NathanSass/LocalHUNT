// Here is your first test rewritten to expect a constructor function.

describe ("Event", function(){
  it("should return a tree object", function(){
    var event = new Event()
    expect(event).toBeDefined();
  });
});


// Copy the rest of the specs from plain-old-js-objects-spec.js one at a time and modify them to use constructor function OO.
