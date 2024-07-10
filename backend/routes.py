from app import app, db
from flask import request, jsonify
from models import course_Mate

# Get all Course Mates
@app.route("/api/coursemates",methods=["GET"])
def get_coursemates():
  coursemates = course_Mate.query.all() 
  result = [coursemate.to_json() for coursemate in coursemates]
  return jsonify(result)

# Create a Course Mate
@app.route("/api/coursemates",methods=["POST"])
def create_coursemate():
  try:
    data = request.json

    # Validations
    required_fields = ["name","role","description","gender"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400

    name = data.get("name")
    role = data.get("role")
    description = data.get("description")
    gender = data.get("gender")

    # Fetch avatar image based on gender
    if gender == "male":
      img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
    elif gender == "female":
      img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
    else:
      img_url = None

    new_coursemate = course_Mate(name=name, role=role, description=description, gender= gender, img_url=img_url)

    db.session.add(new_coursemate) 
    db.session.commit()

    return jsonify(new_coursemate.to_json()), 201
    
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500
  
# Delete a coursemate
@app.route("/api/coursemates/<int:id>",methods=["DELETE"])
def delete_coursemate(id):
  try:
    coursemate = course_Mate.query.get(id)
    if coursemate is None:
      return jsonify({"error":"Course mate not found"}), 404
    
    db.session.delete(coursemate)
    db.session.commit()
    return jsonify({"msg":"Course mate deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500
  
# Update a coursemate profile
@app.route("/api/coursemates/<int:id>",methods=["PATCH"])
def update_coursemate(id):
  try:
    coursemate = course_Mate.query.get(id)
    if coursemate is None:
      return jsonify({"error":"Course Mate not found"}), 404
    
    data = request.json

    coursemate.name = data.get("name",coursemate.name)
    coursemate.role = data.get("role",coursemate.role)
    coursemate.description = data.get("description",coursemate.description)
    coursemate.gender = data.get("gender",coursemate.gender)

    db.session.commit()
    return jsonify(coursemate.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500

