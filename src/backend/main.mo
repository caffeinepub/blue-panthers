import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Role = {
    #player;
    #fan;
    #supporter;
  };

  type Member = {
    name : Text;
    email : Text;
    role : Role;
    signupTime : Time.Time;
  };

  module Member {
    public func compareBySignupTime(member1 : Member, member2 : Member) : Order.Order {
      if (member1.signupTime < member2.signupTime) {
        #less;
      } else if (member1.signupTime > member2.signupTime) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  let members = Map.empty<Text, Member>();

  public shared ({ caller }) func register(name : Text, email : Text, role : Role) : async () {
    if (members.containsKey(email)) { Runtime.trap("This email is already registered.") };

    let member : Member = {
      name;
      email;
      role;
      signupTime = Time.now();
    };

    members.add(email, member);
  };

  public query ({ caller }) func getAllMembers() : async [Member] {
    members.values().toArray().sort(Member.compareBySignupTime);
  };
};
